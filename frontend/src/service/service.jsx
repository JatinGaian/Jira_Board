import { React, useContext } from "react";
import axios from "axios";

const live_base_url = import.meta.env.VITE_live_base_url;


// All sprints on selected board
export const getSprints = async(boardId, setSprintLoader, sprint, setSprint, selectedSprint, setSprintIdState, setSelectedSprint, setBreadCrumbs, setLastClosed, selectedSprintFromSummary, boardName, breadCrumbs) => {

    let sprint_data_map = {};
    setSprintLoader(true);
    try {
        const response = await axios.get(
            live_base_url + "/" + boardId + "/allSprints"
        );
        let all_sprints = response.data.filter(
            (sprint) => sprint.state !== "future"
        );

        for (let sprint of all_sprints) {
            sprint_data_map[sprint.id.toString()] = {
                sprint_start: sprint.startDate.substring(0, 10),
                sprint_end: sprint.endDate.substring(0, 10),
            };
        }
        let default_sprint;
        const active_sprint = all_sprints.filter(
            (sprint) => sprint.state === "active"
        );
        if (active_sprint.length === 0) {
            let closed_sprints = all_sprints.filter(
                (sprint) => sprint.state === "closed"
            );
            default_sprint = closed_sprints[closed_sprints.length - 1];
        } else {
            default_sprint = active_sprint[0];
        }
        getSprintMembers(selectedSprintFromSummary !== null ? selectedSprintFromSummary : active_sprint[0]?.id)
        setSprintIdState(selectedSprintFromSummary !== null ? selectedSprintFromSummary : active_sprint[0]?.id)
        setSprint(all_sprints.reverse());
        setSelectedSprint(selectedSprint !== null ? selectedSprint : all_sprints[0]?.name)

        // Last Closed sprint
        const closedSprint = all_sprints.find(sprint => sprint.state === "closed");
        if (closedSprint) {
            setLastClosed(closedSprint.id.toString());
        } else {
            console.log("No closed sprint found.");
        }
        setBreadCrumbs({
            ...breadCrumbs, home: "home", summaryBoard: "Summary Dashboard", boardSummary: boardName, sprint: all_sprints[0]?.name
        })

    } catch (error) {
        console.log(error);
    }
    setSprintLoader(false);
}

//* for getting all the members of the selected sprint
export const getSprintMembers = async (sprintId, setMembersLoader, setSprintMembers, setSprintIdState, sprint, setMembersFilter) => {

    setMembersLoader(true)
    setSprintMembers(0)
    setMembersFilter("")
    if (sprint !== "") {
        const response = await axios.get(
            `${live_base_url}/sprint/${sprintId}/members`
        );
        const sprint_members = response.data.members;
        setSprintMembers(sprint_members);
        setSprintIdState(sprintId)
        setMembersLoader(false)
    }


}

//* Stories data
export const getStories = async (sprintId, setIsChartLoading, setStoriesLoader, setStories_data, setRock_star, setAc_hygine, membersFilter) => {
    setIsChartLoading(true)
    setStoriesLoader(true)
    const response = await axios.get(
        `${live_base_url}/sprint/${sprintId}/stories`
    );
    const sprint_stories = response.data.issues;
    // console.log(sprint_stories, "Stories");
    const filteredStories = sprint_stories.filter((stories) =>
        stories.assignee.toLowerCase().includes(membersFilter.toLowerCase())
    );
    // console.log(sprint_stories, "sprint_stories");

    // sorting by todo, inprogress, done
    const storyOrder = { "To Do": 1, Done: 3 };
    const sortedStories = sprint_stories.sort((a, b) => (storyOrder[a.story_status] || 2) - (storyOrder[b.story_status] || 2));
    setStories_data(sortedStories);
    // console.log(sortedStories, "sortedStories");


    // Current sprint Rock star (Most story points completed in current sprint)
    const doneStories = sortedStories.filter(story => story.story_status === "Done");
    const assigneeGroups = sortedStories.reduce((acc, story) => {
        if (story.story_status === "Done") {
            acc[story.assignee] = (acc[story.assignee] || 0) + story.story_points;
        }
        return acc;
    }, {});
    const maxPoints = Math.max(...Object.values(assigneeGroups));
    const topAssignees = Object.entries(assigneeGroups)
        .filter(([assignee, points]) => points === maxPoints)
        .map(([assignee, points]) => ({ assignee, totalPoints: points }));
    setRock_star(topAssignees)
    // console.log(topAssignees, "topAssignees");

    let yes = 0;
    let no = 0;
    sprint_stories.forEach((d) => {
        if (d.story_ac_hygiene == "NO") no++;
        if (d.story_ac_hygiene == "YES") yes++;
    });

    setAc_hygine(`Yes : ${yes}, No : ${no}`)


    setStoriesLoader(false)

}

// not done
export const past_sprint_data = async (lastClosed, setStoriesLoader, setPast_sprint_heros) => {
    setStoriesLoader(true);
    if (lastClosed !== "") {
        const response = await axios.get(
            `${live_base_url}/sprint/${lastClosed}/stories`
        );
        const sprint_stories = response.data.issues;

        const doneStories = sprint_stories.filter(story => story.story_status === "Done");
        const assigneeGroups = doneStories.reduce((acc, story) => {
            if (!acc[story.assignee]) {
                acc[story.assignee] = { totalPoints: 0, storyPoints: [] };
            }
            acc[story.assignee].totalPoints += story.story_points;
            acc[story.assignee].storyPoints.push(story.story_points);
            return acc;
        }, {});

        const maxPoints = Math.max(...Object.values(assigneeGroups).map(assignee => assignee.totalPoints));
        const topAssignees = Object.entries(assigneeGroups)
            .filter(([assignee, data]) => data.totalPoints === maxPoints)
            .map(([assignee, data]) => ({ assignee, totalPoints: data.totalPoints, storyPoints: data.storyPoints }));

        if (topAssignees.length === 0) {
            setPast_sprint_heros([{ assignee: "No Heroes in Past Sprint", totalPoints: 0, storyPoints: [] }]);
        } else {
            setPast_sprint_heros(topAssignees);
        }

        setStoriesLoader(false);
    } else {
        return;
    }
};



// Status bar chart
export const getStoriesBarChartData = async (setStoriesBarChart, setIsChartLoading, stories_data, filteredStories) => {
    const sprintStartDate = new Date(stories_data[0]?.sprint_start);
    const sprintEndDate = new Date(stories_data[0]?.sprint_end);
    // Get the actual current date
    const currentDate = new Date();
    // Adjust the current date to be the minimum of the actual current date and the sprint end date
    const adjustedCurrentDate = new Date(Math.min(currentDate, sprintEndDate));
    // Calculate whole sprint duration in days

    // Extracting only the date part
    const sprintStartDateStr = sprintStartDate.toISOString().substring(0, 10);

    const sprintEndDateStr = sprintEndDate.toISOString().substring(0, 10);
    const currentDateStr = adjustedCurrentDate.toISOString().substring(0, 10);


    // const wholeSprintDuration = Math.ceil((sprintEndDateStr - sprintStartDateStr) / (1000 * 60 * 60 * 24));
    // // Calculate number of days from sprint start date till adjusted current date
    // const daysFromStart = Math.ceil((currentDateStr - sprintStartDateStr) / (1000 * 60 * 60 * 24));
    // //percentage of time has been past.
    // const percentageOfTimeElapsed = parseInt(((daysFromStart / wholeSprintDuration) * 100).toFixed(2));
    // //percentage of work done yet
    const wholeSprintDuration = Math.ceil((new Date(sprintEndDateStr) - new Date(sprintStartDateStr)) / (1000 * 60 * 60 * 24));
    const daysFromStart = Math.ceil((Math.min(new Date(currentDateStr), new Date(sprintEndDateStr)) - new Date(sprintStartDateStr)) / (1000 * 60 * 60 * 24));
    const percentageOfTimeElapsed = parseInt(((daysFromStart / wholeSprintDuration) * 100).toFixed(2));
    const percentageOfWork = parseInt((((filteredStories?.filter((s) => s.status_name == "Done")).length / filteredStories.length) * 100).toFixed(2));
    let color = null;
    let workDone = percentageOfTimeElapsed - percentageOfWork
    if (workDone >= 0 && workDone <= 20) {
        // color = "#3ce000"; // Work Done is equal to or ahead of Time Taken color will be "GREEN"
        color = "#28801a"; // Work Done is equal to or ahead of Time Taken color will be "GREEN"
    } else if (workDone >= 20 && workDone <= 30) {
        // color = "#ffd944"; // Work Done is slightly behind Time Taken color will be "YELLOW"
        color = "#bea130"; // Work Done is slightly behind Time Taken color will be "YELLOW"
    } else if (workDone > 30) {
        // color = "#c13131"; // Work Done is significantly behind Time Taken color will be "RED"
        color = "#630606"; // Work Done is significantly behind Time Taken color will be "RED"
    } else {
        color = "#bb86fc"; // Work Done is significantly behind Time Taken color will be "RED"
    }

    setStoriesBarChart(
        { workDone: percentageOfWork, timeTaken: percentageOfTimeElapsed, colorCode: color, sprintDuration: wholeSprintDuration, daysSpent: daysFromStart, sprintStartDate: sprintStartDateStr, sprintEndDate: sprintEndDateStr }
    )

    setIsChartLoading(false)
}

// Pie chart in board Summary
export const getSubtasks = async (setPie_loader, boardId, setSprints_subtasks) => {
    // setIs_summary(!is_summary)
    let all_pie_data = [];

    setPie_loader(true)
    try {

        const response = await axios.get(
            `${live_base_url}/summaryDashboard/${boardId}/subtask/progress`,

        );
        all_pie_data = response.data;
        // console.log(response);

        if (all_pie_data.length > 0) {
            setSprints_subtasks((prev) => (
                all_pie_data[0]
            ))
        }
        setPie_loader(false)
        // console.log(all_pie_data, "all_pie_data");

    } catch (error) {
        console.log(error.message);
    }

}


// Top Assignee
export const gettopAssignee = async (setPie_loader, boardId, setTrust_worthy, setProblem_solver) => {
    // setIs_summary(!is_summary)
    let stories = [];

    setPie_loader(true)
    try {

        const response = await axios.get(
            `${live_base_url}/${boardId}/stories`,

        );
        stories = response.data.stories;
        // console.log(response);

        // setPie_loader(false)
        // console.log(stories, "all_stories");
        const doneStories = stories.filter(
            (story) => story.story_status === "Done"
        );
        // console.log(stories, "stories");

        // Group stories by assignee
        const assigneeGroups = doneStories.reduce((acc, story) => {
            if (!acc[story.assignee]) {
                acc[story.assignee] = { totalPoints: 0 };
            }
            acc[story.assignee].totalPoints += story.story_points;
            // acc[story.assignee].storyPoints.push(story.story_points);
            return acc;
        }, {});

        // Find the highest total points
        const maxPoints = Math.max(
            ...Object.values(assigneeGroups).map((assignee) => assignee.totalPoints)
        );

        // Find the assignees with the highest total points
        const trust_worthy = Object.entries(assigneeGroups)
            .filter(([assignee, data]) => data.totalPoints === maxPoints)
            .map(([assignee, data]) => ({ assignee, totalPoints: data.totalPoints }));



        const all_stories = doneStories.sort(
            (a, b) => b.story_points - a.story_points
        );
        const doneAssignee = all_stories.length > 0 ? all_stories[0] : null;
        // console.log(doneAssignee,"doneAssignee");
        const problemsolver = doneAssignee
            ? {
                assignee: doneAssignee.assignee,
                story_points: doneAssignee.story_points,
                // stories_count : all_stories.length
            }
            : null;
        setTrust_worthy(trust_worthy)
        setProblem_solver([problemsolver])
        // trust_worthy.push({ problemsolver });

        // console.log(trust_worthy, "trust_worthy");
        // console.log([problemsolver], "problemsolver");

    } catch (error) {
        console.log(error.message);
    }
    // console.log(sprints_subtasks, "sprints_subtasks");
    // setAll_summary_charts(prev => (all_pie_data))
    // console.log(summaryPieData);
}


// Project data

export const get_project_data = async (boardId, setProject_lead) => {
    try {

        const response = await axios.get(
            `${live_base_url}/${boardId}/project`,

        );
        setProject_lead(response.data.project.project_lead)
        // console.log(response.data.project, " metadata");
        // console.log(project_lead)

    } catch (error) {
        console.log(error.message);
    }

}


// Single bar chart
export const get_single_barchart = async (filteredStories, setMeta_data, setStory_points_chart) => {
    let [number_of_sub_tasks, completedtasks] = [0, 0];
    // let number_of_sub_tasks = 0;
    // let completedtasks = 0;

    if (Array.isArray(filteredStories)) {
        const statusSummary = {};
        let totalStoryPoints = 0;



        filteredStories.forEach(story => {
            const { status_name, story_points } = story;

            // Update status summary
            if (statusSummary[status_name]) {
                statusSummary[status_name] += story_points;
            } else {
                statusSummary[status_name] = story_points;
            }

            // Accumulate total story points
            totalStoryPoints += story_points;
            // console.log(story.number_of_sub_tasks, "number_of_sub_tasks");
            // sprint_stories.forEach((d) => {
            number_of_sub_tasks += story.number_of_sub_tasks;
            completedtasks += story.completed_sub_tasks;
            // });

        });
        // console.log([number_of_sub_tasks, completedtasks]);
        setMeta_data({
            number_of_sub_tasks: number_of_sub_tasks,
            completed_sub_tasks: completedtasks,
        });


        // Map status summary to desired format
        const formattedData = Object.entries(statusSummary).map(([name, value]) => ({
            name,
            value
        }));
        const order = { 'To Do': 1, 'Done': -1 };


        setStory_points_chart(formattedData.sort((a, b) => {
            if (a.name === 'To Do') return -1;
            if (b.name === 'To Do') return 1;
            if (a.name === 'Done') return 1;
            if (b.name === 'Done') return -1;
            return 0;
        }))


    }
    else {
        console.log("sprint_stories is not an array or is undefined/null.");
    }
}


// Summary dashboard
// export const get_boards_active_sprint = async (boardsData, setActiveBoardssetActiveBoards, setSprintPieChart, setSprintBarChart) => {
//     const batchSize = 7;
//     // const batches = [];
//     const tempBarChartData = [];
//     for (let i = 0; i < boardsData?.length; i += batchSize) {
//         const batches = boardsData.slice(i, i + batchSize);

//         try {
//             const response = await axios.post(`${live_base_url}/allboards/activesprints`, batches);


//             if (response?.data.length > 0) {
//                 setActiveBoards(prev => ([...prev, ...response.data]));
//                 for (let i = 0; i < response.data.length; i++) {

//                     // let active_board = response.data[i]
//                     // console.log(response.data[i])
//                     for (let j = 0; j < response.data[i].sprints.length; j++) {

//                         const response_piechart = await axios.get(`${live_base_url}/summaryDashboard/${response.data[i].sprints[j].sprint_id}/${response.data[i].sprints[j].sprint_name}/subtask`);
//                         // console.log(response_piechart.data, "response_piechart");

//                         setSprintPieChart(prev => ([...prev, ...response_piechart.data]))
//                         // Calculate metrics for each sprint
//                         const sprintStartDate = new Date(response.data[i].sprints[j].sprint_start);
//                         const sprintEndDate = new Date(response.data[i].sprints[j].sprint_end);
//                         const currentDate = new Date();
//                         const adjustedCurrentDate = new Date(Math.min(currentDate, sprintEndDate));
//                         // Extracting only the date part
//                         const sprintStartDateStr = sprintStartDate.toISOString().substring(0, 10);
//                         const sprintEndDateStr = sprintEndDate.toISOString().substring(0, 10);
//                         const currentDateStr = adjustedCurrentDate.toISOString().substring(0, 10);

//                         // Calculating other metrics
//                         const wholeSprintDuration = Math.ceil((new Date(sprintEndDateStr) - new Date(sprintStartDateStr)) / (1000 * 60 * 60 * 24));
//                         const daysFromStart = Math.ceil((Math.min(new Date(currentDateStr), new Date(sprintEndDateStr)) - new Date(sprintStartDateStr)) / (1000 * 60 * 60 * 24));
//                         const percentageOfTimeElapsed = parseInt(((daysFromStart / wholeSprintDuration) * 100).toFixed(2));
//                         const percentageOfWork = parseInt((((response.data[i].sprints[j].done_stories) / response.data[i].sprints[j].total_stories) * 100).toFixed(2));



//                         setSprintBarChart(prev => [...prev, {
//                             boardName: response.data[i].board_name,
//                             boardId: response.data[i].board_id,
//                             sprintId: response.data[i].sprints[j].sprint_id,
//                             sprintName: `${response.data[i].sprints[j].sprint_name} - ${response.data[i].board_name}`,
//                             percentageOfTimeElapsed: percentageOfTimeElapsed,
//                             percentageOfWork: percentageOfWork,
//                             workDone: (percentageOfWork == 0 ? percentageOfWork : percentageOfTimeElapsed - percentageOfWork),
//                             sprintStartDateStr: sprintStartDateStr,
//                             sprintEndDateStr: sprintEndDateStr,
//                             currentDateStr: currentDateStr,
//                             daysFromStart: daysFromStart,
//                             wholeSprintDuration: wholeSprintDuration,
//                         }]);
//                     }
//                 }
//                 // console.log(response.data);
//             }
//             setSummarySprintLoader(false);
//         } catch (error) {
//             console.error("Error fetching active sprints:", error);
//             // Handle error
//         }
//     }
// }


export const findSubtask = async (sprintName, sprintData, setSinglePieChart) => {
    if (sprintData !== null) {
        const transformedData = sprintData.map(obj => {
            const key = Object.keys(obj)[0];
            const value = obj[key];
            return { name: key, value: value };
        });
        const sprintObject = { name: sprintName, data: transformedData };
        setSinglePieChart(sprintObject)
        // console.log(sprintObject);
    }
    else { return }
}
