import axios from "axios";
import { createContext, useEffect, useState } from "react";
import json_data from "../components/data/data";

const live_base_url = import.meta.env.VITE_live_base_url;

export const SrdpContext = createContext();
export const ContextProvider = ({ children }) => {
    const [expandNav, setExpandNav] = useState(false)
    const [storiesLength, setStoriesLength] = useState(0)
    const [membersFilter, setMembersFilter] = useState("")
    const [story_points_chart, setStory_points_chart] = useState([])
    const [rock_star, setRock_star] = useState([]);
    const [singlePieChart, setSinglePieChart] = useState({})
    const [showBarGraph, setShowBarGraph] = useState(true)
    const [isChartLoading, setIsChartLoading] = useState(true)
    const [storiesBarChart, setStoriesBarChart] = useState({
        workDone: "",
        timeTaken: "",
        colorCode: "",
        sprintDuration: "",
        daysSpent: ""
    })
    const [sprints_subtasks, setSprints_subtasks] = useState()
    const [pie_loader, setPie_loader] = useState(false)
    const [allboards, setAllboards] = useState(json_data);
    const [allBoardLoading, setAllBoardLoading] = useState(false)
    const [sprintMembers, setSprintMembers] = useState(0)
    const [is_summary, setIs_summary] = useState(false);
    const [selectedSprint, setSelectedSprint] = useState("")
    const [selectedSprintFromSummary, setSelectedSprintFromSummary] = useState(null)
    const [sprintLoader, setSprintLoader] = useState(false)
    const [membersLoader, setMembersLoader] = useState(false)
    const [sprintIdState, setSprintIdState] = useState(null)
    const [sprint, setSprint] = useState("")
    const [storiesLoader, setStoriesLoader] = useState(false)
    const [stories_data, setStories_data] = useState([]);
    const [ac_hygine, setAc_hygine] = useState("")
    const [past_sprint_heros, setPast_sprint_heros] = useState([])
    const [trust_worthy, setTrust_worthy] = useState([]);
    const [problem_solver, setProblem_solver] = useState([]);
    const [project_lead, setProject_lead] = useState(null)



    const [activeBoards, setActiveBoards] = useState([])
    const [sprintBarChart, setSprintBarChart] = useState([])
    const [sprintPieChart, setSprintPieChart] = useState([])
    const [storyData, setStoryData] = useState({ original_estimate: "Select story", remaining_estimate: "Select story", time_spent: "Select story", story_reviewers: "Select story" })
    const [filterSprintBarChart, setFilterSprintBarChart] = useState({
        lessThan: +Infinity, greaterThan: -Infinity
    })
    const [meta_data, setMeta_data] = useState({
        number_of_sub_tasks: 0,
        completed_sub_tasks: 0,
        eviewers: "Nil"
    });
    const [selected, setSelected] = useState({
        onTrack: false, behind: false, delayed: false, ahead: false
    })
    const [searchValue, setSearchValue] = useState("")
    const [lastClosed, setLastClosed] = useState("");



    //# loader state
    const [summarySprintLoader, setSummarySprintLoader] = useState(true)
    // const [membersLoader, setMembersLoader] = useState(true)
    // console.log(url);

    //# for breadcrumbs
    const [breadCrumbs, setBreadCrumbs] = useState({
        home: null,
        summaryBoard: null,
        boardSummary: null,
        sprint: null
    })

    //# for getting all the boards 
    const all_boards_AQ =
        "https://ig.aidtaas.com/pi-bigquery-service/v1.0/big-queries/65e19b89c7d70117c9910ea7/data?size=1000";
    const token =
        "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImZmOGYxNjhmLTNmZjYtNDZlMi1iMTJlLWE2YTdlN2Y2YTY5MCJ9.eyJzdWIiOiJnYWlhbi5jb20iLCJ1c2VyX25hbWUiOiJwb3J0YWxfdGVzdCIsInNjb3BlIjpbInRydXN0IiwicmVhZCIsIndyaXRlIl0sInRlbmFudElkIjoiNjExYmRkMzQyNmE5NDg2MDA1NjkzYjExIiwiaXNzIjoiZ2FpYW4uY29tIiwidXNlck5hbWUiOiJwb3J0YWxfdGVzdCIsImF1dGhvcml0aWVzIjpbIlJPTEVfT01OSV9DT05TVU1FUiIsIlJPTEVfTUFSS0VUUExBQ0VfVVNFUiIsIlJPTEVfT01OSV9VU0VSIl0sImp0aSI6IjgxODE1ZDNmLTY1MTAtNDJkNC05NWZkLTNiZTJmMWYzYjg5ZiIsImVtYWlsIjoicG9ydGFsX3Rlc3RAZ2F0ZXN0YXV0b21hdGlvbi5jb20iLCJjbGllbnRfaWQiOiJnYWlhbiJ9.Mz1gWLt1rujlQWW3SzuwtERk1i6HwG9utVuMUnL-RX4kKtR1jl0eR9MZmNjRZ0znbrr6w8MOj2aAULtpIEYmM9jU_mXGBuqetPIbTuV2d4Hkv6f0qaJZLAIAU3qhgijQI9O4a2yg_rmHnibNhEcZMKEFK5AXw8M_B8XIgnNYlXDkpjEqP6Siv0HJmHA3T1j1XY8PCsluzIwDzIgRr-xqAJcaCnUwGR7XxsF-X0plk8L9qV1Z3bF2EMqqBsednYeqaM3EqwJXk27R5PFU7jn5aOc-_n9DxaGLcuJB5JoqoGW7DeaIKLzMwxvS9vP_bc8vDOxl8xk-zTRAq8goyHV6IQ";



    const get_boards_active_sprint = async (boardsData) => {
        const batchSize = 7;
        // const batches = [];
        const tempBarChartData = [];
        for (let i = 0; i < boardsData?.length; i += batchSize) {
            const batches = boardsData.slice(i, i + batchSize);

            try {
                const response = await axios.post(`${live_base_url}/allboards/activesprints`, batches);


                if (response?.data.length > 0) {
                    setActiveBoards(prev => ([...prev, ...response.data]));
                    for (let i = 0; i < response.data.length; i++) {

                        // let active_board = response.data[i]
                        // console.log(response.data[i])
                        for (let j = 0; j < response.data[i].sprints.length; j++) {

                            const response_piechart = await axios.get(`${live_base_url}/summaryDashboard/${response.data[i].sprints[j].sprint_id}/${response.data[i].sprints[j].sprint_name}/subtask`);
                            // console.log(response_piechart.data, "response_piechart");

                            setSprintPieChart(prev => ([...prev, ...response_piechart.data]))
                            // Calculate metrics for each sprint
                            const sprintStartDate = new Date(response.data[i].sprints[j].sprint_start);
                            const sprintEndDate = new Date(response.data[i].sprints[j].sprint_end);
                            const currentDate = new Date();
                            const adjustedCurrentDate = new Date(Math.min(currentDate, sprintEndDate));
                            // Extracting only the date part
                            const sprintStartDateStr = sprintStartDate.toISOString().substring(0, 10);
                            const sprintEndDateStr = sprintEndDate.toISOString().substring(0, 10);
                            const currentDateStr = adjustedCurrentDate.toISOString().substring(0, 10);

                            // Calculating other metrics
                            const wholeSprintDuration = Math.ceil((new Date(sprintEndDateStr) - new Date(sprintStartDateStr)) / (1000 * 60 * 60 * 24));
                            const daysFromStart = Math.ceil((Math.min(new Date(currentDateStr), new Date(sprintEndDateStr)) - new Date(sprintStartDateStr)) / (1000 * 60 * 60 * 24));
                            const percentageOfTimeElapsed = parseInt(((daysFromStart / wholeSprintDuration) * 100).toFixed(2));
                            const percentageOfWork = parseInt((((response.data[i].sprints[j].done_stories) / response.data[i].sprints[j].total_stories) * 100).toFixed(2));



                            setSprintBarChart(prev => [...prev, {
                                boardName: response.data[i].board_name,
                                boardId: response.data[i].board_id,
                                sprintId: response.data[i].sprints[j].sprint_id,
                                sprintName: `${response.data[i].sprints[j].sprint_name} - ${response.data[i].board_name}`,
                                percentageOfTimeElapsed: percentageOfTimeElapsed,
                                percentageOfWork: percentageOfWork,
                                workDone: (percentageOfWork == 0 ? percentageOfWork : percentageOfTimeElapsed - percentageOfWork),
                                sprintStartDateStr: sprintStartDateStr,
                                sprintEndDateStr: sprintEndDateStr,
                                currentDateStr: currentDateStr,
                                daysFromStart: daysFromStart,
                                wholeSprintDuration: wholeSprintDuration,
                            }]);
                        }
                    }
                    // console.log(response.data);
                }
                setSummarySprintLoader(false);
            } catch (error) {
                console.error("Error fetching active sprints:", error);
                // Handle error
            }
        }
    }
    useEffect(() => { // Your array of board names
        setSummarySprintLoader(true)
        get_boards_active_sprint(json_data)
    }, []);

    useEffect(() => {
        get_boards_active_sprint()
    }, [allboards])

    return (
        <SrdpContext.Provider value={{
            expandNav, setExpandNav, membersFilter, setMembersFilter,
            storiesLength, setStoriesLength, story_points_chart, setStory_points_chart,
            storiesBarChart, setStoriesBarChart, rock_star, setRock_star,
            showBarGraph, setShowBarGraph, activeBoards, setActiveBoards,
            isChartLoading, setIsChartLoading, singlePieChart, setSinglePieChart,
            summarySprintLoader, setSummarySprintLoader, token,
            allboards, setAllboards, allBoardLoading, setAllBoardLoading, is_summary, setIs_summary,
            sprintMembers, setSprintMembers, membersLoader, setMembersLoader, selectedSprint, setSelectedSprint,
            selectedSprintFromSummary, setSelectedSprintFromSummary, sprintBarChart, setSprintBarChart,
            filterSprintBarChart, setFilterSprintBarChart, selected, setSelected, searchValue, setSearchValue, sprintPieChart, setSprintPieChart,
            pie_loader, setPie_loader, sprints_subtasks, setSprints_subtasks, breadCrumbs, setBreadCrumbs, meta_data, setMeta_data, storyData, setStoryData, lastClosed, setLastClosed, sprintLoader, setSprintLoader, sprintIdState, setSprintIdState, sprint, setSprint, storiesLoader, setStoriesLoader, stories_data, setStories_data, ac_hygine, setAc_hygine, past_sprint_heros, setPast_sprint_heros, trust_worthy, setTrust_worthy, problem_solver, setProblem_solver, project_lead, setProject_lead

        }}>
            {children}
        </SrdpContext.Provider>
    )
}