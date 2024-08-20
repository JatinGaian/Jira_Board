var axios = require("axios");
require("dotenv").config();

const username = process.env.ATLASSIAN_USERNAME;
const password = process.env.ATLASSIAN_API_KEY;
const domain = process.env.DOMAIN;

const auth = {
    username: username,
    password: password,
};

// Function to get issues for a specific user by email in open sprints
async function get_issues_for_selected_member(email) {
    try {
        const baseUrl = `https://${domain}.atlassian.net`;
        const jqlQuery = `assignee = "${email}"`;
        let startAt = 0;
        let maxResults = 100; // Max results per page (up to 1000)
        let allIssues = [];

        while (true) {
            const config = {
                method: "get",
                url: `${baseUrl}/rest/api/2/search?jql=${encodeURIComponent(jqlQuery)}&startAt=${startAt}&maxResults=${maxResults}`,
                headers: { "Content-Type": "application/json" },
                auth: auth,
            };

            const response = await axios.request(config);
            const issues = response.data.issues;

            allIssues = allIssues.concat(issues);

            // Break the loop if we have fetched all issues
            if (issues.length < maxResults) {
                break;
            }

            // Increment startAt for the next pagination
            startAt += maxResults;
        }

        return allIssues;
    } catch (error) {
        console.log("Error fetching issues: ");
        console.log(error?.response?.data?.errors);
        throw error;
    }
}

module.exports = get_issues_for_selected_member;
