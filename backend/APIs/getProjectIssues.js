var axios = require("axios");
require("dotenv").config();

const username = process.env.ATLASSIAN_USERNAME;
const password = process.env.ATLASSIAN_API_KEY;
const domain = process.env.DOMAIN;

const auth = {
    username: username,
    password: password,
};

// Gets all issues in a particular project using the Jira Cloud REST API
async function getProjectIssues(projectIdOrKey) {
    try {
        const baseUrl = `https://${domain}.atlassian.net`;
        const jqlQuery = `project = "${projectIdOrKey}"`;
        const fields = "summary,customfield_10020,customfield_10018"; // Fields to retrieve
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
                storyPoints: issue.fields.customfield_10020 || 0,
                sprintName: issue.fields.customfield_10018 ? issue.fields.customfield_10018[0]?.name : null
            }));

            allIssues = allIssues.concat(issueDetails);

            if (issues.length < maxResults) {
                break;
            }

            startAt += maxResults;
        }

        return allIssues;
    } catch (error) {
        console.log("Error fetching issue details: ");
        console.log(error.response?.data?.errors ? error.response?.data?.errors : error.response);
    }
}

module.exports = getProjectIssues;
