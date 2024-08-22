
const moment = require("moment");
const { calculateRemainingDays } = require("./calculateRemainingDays");


const storyConvertor = (issue, sprints) => {
    const getDate = (date) => moment(date).format("MMM Do YYYY, h:mm:ss A");
    if (issue.fields.issuetype.name === "Story") {
        
    }
    // Filtering issuelinks for 'blocked by' and 'blocks'
    const blockedBy = issue?.fields?.issuelinks
        ?.filter(link => link.type.inward === "is blocked by")
        ?.map(link => ({
            id: link.inwardIssue.id,
            key: link.inwardIssue.key,
            summary: link.inwardIssue.fields.summary,
            status: link.inwardIssue.fields.status.name,
            priority: link.inwardIssue.fields.priority.name,
            type: link.inwardIssue.fields.issuetype.name
        })) || [];

    const blocks = issue?.fields?.issuelinks
        ?.filter(link => link.type.outward === "blocks")
        ?.map(link => ({
            id: link.outwardIssue.id,
            key: link.outwardIssue.key,
            summary: link.outwardIssue.fields.summary,
            status: link.outwardIssue.fields.status.name,
            priority: link.outwardIssue.fields.priority.name,
            type: link.outwardIssue.fields.issuetype.name
        })) || [];

    const story = {
        story_id: issue.id,
        story_key: issue?.key,
        story_name: issue?.fields?.summary,
        story_type: issue?.fields?.issuetype?.name,
        issueIcon: issue?.fields?.issuetype?.iconUrl,
        story_status: issue?.fields?.status?.statusCategory?.name,
        projectData: {
            project_id: issue?.fields?.project?.id,
            project_name: issue?.fields?.project?.name,
            project_key: issue?.fields?.project?.key,
            projectImage: issue?.fields?.project?.avatarUrls["32x32"],
        },
        blockedBy: blockedBy,
        blocks: blocks,
        status_name: issue?.fields?.status?.name,
        sprint_id: issue.fields.customfield_10018?.[0]?.id,
        sprint_state: issue.fields.customfield_10018?.[0]?.state,
        sprint_name: issue.fields.customfield_10018?.[0]?.name,
        sprint_start: getDate(issue.fields.customfield_10018?.startDate),
        sprint_end: getDate(issue.fields.customfield_10018?.endDate),
        story_ac_hygiene: issue?.fields?.customfield_10156 !== null ? "YES" : "NO",
        original_estimate: getDate(issue?.fields?.timetracking?.originalEstimate) || "Not added",
        remaining_estimate: getDate(issue?.fields?.timetracking?.remainingEstimate) || "Not added",
        time_spent: issue?.fields?.timetracking?.timeSpent || "Not added",
        story_reviewers: issue?.fields?.customfield_10003
            ? issue.fields.customfield_10003.length !== 0
                ? issue.fields.customfield_10003.map((r) => r.displayName).join(", ")
                : "Reviewers not added"
            : "Reviewers not added",
        story_points: issue?.fields?.customfield_10020 == null ? 0 : issue.fields.customfield_10020,
        updated: getDate(issue?.fields?.updated),
        creator: issue?.fields?.creator?.displayName,
        assignee: issue?.fields?.assignee !== null ? issue.fields.assignee.displayName : "Not added",
        email: issue?.fields?.assignee?.emailAddress,
        duedate: getDate(issue?.fields?.duedate == null ? issue?.fields?.customfield_10018?.[issue.fields.customfield_10018.length - 1]?.endDate : issue.fields.duedate),
        // sprintDuration: sprintDuration,
        // daysSpent: daysSpent,
        daysLeft: calculateRemainingDays(issue.fields.customfield_10018?.endDate),
        number_of_sub_tasks: issue?.fields?.subtasks?.length,
        completed_sub_tasks: issue?.fields?.subtasks?.filter(subtask => subtask?.fields?.status?.name === "Done")?.length,
        subtasks: issue?.fields?.subtasks?.map(subtask => {
            return {
                id: subtask?.id,
                subtask_key: subtask?.key,
                status: subtask?.fields?.status?.name,
                subtaskName: subtask?.fields?.summary,
                subtaskHistory: []
            };
        }),
        storyHistory: issue?.changelog?.histories?.map(history => {
            const lastChange = history?.items?.[history.items.length - 1];
            return {
                id: history?.id,
                author: history?.author?.displayName,
                email: history?.author?.emailAddress,
                timeLog: getDate(history?.created),
                changeType: lastChange?.field,
                changedFrom: lastChange?.fromString,
                changedTo: lastChange?.toString,
            };
        }),
        // commits: IssueCommits
    };

    return story
};

module.exports = { storyConvertor };