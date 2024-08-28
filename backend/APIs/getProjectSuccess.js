var axios = require("axios");
require("dotenv").config();

const username = process.env.ATLASSIAN_USERNAME;
const password = process.env.ATLASSIAN_API_KEY;
const domain = process.env.DOMAIN;

const auth = {
    username: username,
    password: password,
};

// Gets all issues including backlogs and issues of every status in a particular project using the Jira Cloud REST API
async function getProjectSuccess(projectId) {
    try {
        const baseUrl = `https://${domain}.atlassian.net`;
        // Modify the JQL query to include all issues, including those in the backlog (sprint is EMPTY)
        const jqlQuery = `project = "${projectId}" AND (sprint is EMPTY OR sprint is not EMPTY)`;
        const fields = "summary,customfield_10020,customfield_10026,customfield_10018,status,project,issuetype"; // Extended fields to retrieve
        let startAt = 0;
        let maxResults = 100;
        let allIssues = [];

        while (true) {
            const config = {
                method: "get",
                url: `${baseUrl}/rest/api/2/search?jql=${encodeURIComponent(jqlQuery)}&fields=key,${fields}&startAt=${startAt}&maxResults=${maxResults}`,
                headers: { "Content-Type": "application/json" },
                auth: auth,
            };

            const response = await axios.request(config);
            const issues = response.data.issues;

            const issueDetails = issues.map(issue => ({
                key: issue.key,
                summary: issue.fields.summary,
                storyPoints: issue?.fields?.customfield_10020 ?? issue?.fields?.customfield_10026 ?? 0,
                sprintName: issue.fields.customfield_10018 ? issue.fields.customfield_10018[0]?.name : null,
                status: issue.fields.status.name,
                projectName: issue.fields.project.name,
                projectKey: issue.fields.project.key,
                issueType: issue.fields.issuetype.name
            }));

            allIssues = allIssues.concat(issueDetails);

            if (issues.length < maxResults) {
                break;
            }

            startAt += maxResults;
        }

        // Calculate the number of total stories and done stories
        const totalStories = allIssues.length;
        const doneStories = allIssues.filter(issue => issue.status.toLowerCase() === 'done').length;

        // Calculate project success probability
        const successProbability = totalStories > 0 ? (doneStories / totalStories) * 100 : 0;

        return {
            projectId: projectId,
            projectName: allIssues?.[0]?.projectName,
            projectKey: allIssues?.[0]?.projectKey,
            totalStories: totalStories,
            doneStories : doneStories,
            successProbability: successProbability.toFixed(2) + '%',
        };

    } catch (error) {
        console.log("Error fetching issue details: ");
        console.log(error.response?.data?.errors ? error.response?.data?.errors : error.response);
    }
}

module.exports = getProjectSuccess;
