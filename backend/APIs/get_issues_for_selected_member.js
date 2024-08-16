var axios = require("axios");
require("dotenv").config();

const username = process.env.ATLASSIAN_USERNAME;
const password = process.env.ATLASSIAN_API_KEY;
const domain = process.env.DOMAIN;

const auth = {
    username: username,
    password: password,
};

// Function to get issues for a specific user in open sprints
async function get_issues_for_selected_member(user) {
    try {
        const baseUrl = `https://${domain}.atlassian.net`;

        const jqlQuery = `assignee = "${user}"`;
        const config = {
            method: "get",
            url: `${baseUrl}/rest/api/2/search?jql=${encodeURIComponent(jqlQuery)}`,
            headers: { "Content-Type": "application/json" },
            auth: auth,
        };

        const response = await axios.request(config);
        // Extracting relevant information from the issues
        // const result = issues.map((issue) => ({
        //     issue_id: issue.id,
        //     issue_key: issue.key,
        //     summary: issue.fields.summary,
        //     sprint: issue.fields.sprint ? issue.fields.sprint.name : null,
        //     project: issue.fields.project ? issue.fields.project.name : null,
        // }));

        return response.data;
    } catch (error) {
        console.log("Error fetching issues: ");
        console.log(error?.response?.data?.errors);
        throw error;
    }
}

module.exports = get_issues_for_selected_member;