import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const live_base_url = import.meta.env.VITE_live_base_url;

export const MainContext = createContext();

export const MainContextProvider = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate()

    const [darkMode, setDarkMode] = useState(false);
    const [navItem, setNavItem] = useState(window.location.pathname.split("/")[1])
    const [sprintProgressToolTip, setSprintProgressToolTip] = useState(false)
    const [dataFetched, setDataFetched] = useState(false);
    const [boardsData, setBoardsData] = useState([]);
    const [summaryProgress, setSummaryProgress] = useState(0)
    const [activeBoards, setActiveBoards] = useState([])
    const [selectedBoardSprint, setSelectedBoardSprint] = useState("")
    const [selectedBoardName, setSelectedBoardName] = useState("")
    const [summarySprintLoader, setSummarySprintLoader] = useState(true)
    const [sprintBarChart, setSprintBarChart] = useState([])
    const [gitBoards, setGitBoards] = useState([])
    const [sprintCount, setSprintCount] = useState(0)
    const [sprintPieChart, setSprintPieChart] = useState([]);
    const [gitLogs, setGitLogs] = useState([])
     const [loggedInUser, setLoggedInUser] = useState()


    // get all boards
    const get_activeboards = async () => {
        const response = await axios.get(`${live_base_url}/allBoards`)
        setBoardsData(response.data.response)
        // console.log(response.data.response, "get_activeBoards")
    }

    // git logs data
    const get_git_data = async () => {
        const response = await axios.post(`${live_base_url}/sprint/gitdata`, gitBoards);
        setGitLogs(prev => ([...prev, ...response.data]))
        console.log(gitLogs, "whole data of git Logs")
    }

    const get_boards_active_sprint = async () => {
        const batchSize = 10;
        setDataFetched(false)
        for (let i = 0; i < boardsData?.length; i += batchSize) {
            const batches = boardsData.slice(i, i + batchSize);
            const progressPercentage = ((i + batchSize) / boardsData.length) * 100;

            setSummaryProgress(Math.min(progressPercentage, 100).toFixed(2)); // Setting the progress, capped at 100%

            try {
                let response = await axios.post(`${live_base_url}/allboards/activesprints`, batches);
                // console.log(response, "all sprints")
                setGitBoards(response.data)
                const filteredResponse = await response?.data.filter((sprint) => sprint.sprint_status === "active")
                // console.log(filteredResponse, "/allboards/activesprints")
                //response that we are getting 
                // {
                //     "board_id": 282,
                //         "board_name": "MIE board",
                //             "board_type": "scrum",
                //                 "sprint_id": 1338,
                //                     "sprint_name": "MIB Sprint 3",
                //                         "sprint_status": "active",
                //                             "sprint_start": "2024-07-29T08:18:00.000Z",
                //                                 "sprint_end": "2024-08-01T19:00:00.000Z",
                //                                     "total_stories": 2,
                //                                         "done_stories": 0,
                //                                             "in_progress_stories": 2,
                //                                                 "total_story_points": 3,
                //                                                     "total_inProgress_points": 3,
                //                                                         "members": [
                //                                                             {
                //                                                                 "name": "Jatin",
                //                                                                 "accountId": "712020:7b0d641e-9ca7-49d1-af4d-ddf2d07d1dd4",
                //                                                                 "emailAddress": "jatin.s@mobiusdtaas.ai"
                //                                                             }
                //                                                         ] }
                if (filteredResponse.length > 0) {
                    setActiveBoards(prev => ([...prev, ...filteredResponse]));
                    // console.log(filteredResponse, "activeBoards for story points")
                    if (i == 0) {
                        setSelectedBoardSprint(filteredResponse[0]?.sprint_name)
                        setSelectedBoardName(filteredResponse[0]?.board_name)
                        // setSelectedBoardName
                        // console.log("piechart setteled")
                    }
                    for (let i = 0; i < filteredResponse.length; i++) {
                        setSummarySprintLoader(false);
                        // let active_board = filteredResponse.data[i]
                        // console.log(filteredResponse[i])

                        // conditional for loop checking for the boards
                        // for (let j = 0; j < filteredResponse[i].sprints.length; j++) {



                        const response_piechart = await axios.get(`${live_base_url}/summaryDashboard/${filteredResponse[i].sprint_id}/${filteredResponse[i].sprint_name}/subtask`);
                        setSprintPieChart(prev => ([...prev, ...response_piechart.data]))
                        // Calculate metrics for each sprint
                        const sprintStartDate = new Date(filteredResponse[i].sprint_start);
                        const sprintEndDate = new Date(filteredResponse[i].sprint_end);
                        const currentDate = new Date();
                        const adjustedCurrentDate = new Date(Math.min(currentDate, sprintEndDate));
                        // Extracting only the date part
                        const sprintStartDateStr = sprintStartDate?.toISOString().substring(0, 10);
                        const sprintEndDateStr = sprintEndDate?.toISOString().substring(0, 10);
                        const currentDateStr = adjustedCurrentDate?.toISOString().substring(0, 10);

                        // Calculating other metrics
                        const wholeSprintDuration = Math.ceil((new Date(sprintEndDateStr) - new Date(sprintStartDateStr)) / (1000 * 60 * 60 * 24));
                        const daysFromStart = Math.ceil((Math.min(new Date(currentDateStr), new Date(sprintEndDateStr)) - new Date(sprintStartDateStr)) / (1000 * 60 * 60 * 24));
                        const percentageOfTimeElapsed = parseInt(((daysFromStart / wholeSprintDuration) * 100).toFixed(2));
                        const percentageOfWork = parseInt((((filteredResponse[i].done_stories) / filteredResponse[i].total_stories) * 100).toFixed(2));
                        const percentageOfWork_in_progress = parseInt((((filteredResponse[i].in_progress_stories) / filteredResponse[i].total_stories) * 100).toFixed(2));


                        // - ${ filteredResponse[i].board_name }
                        setSprintBarChart(prev => [...prev, {
                            boardName: filteredResponse[i].board_name,
                            boardId: filteredResponse[i].board_id,
                            sprintId: filteredResponse[i].sprint_id,
                            sprintName: `${filteredResponse[i].sprint_name}`,
                            percentageOfTimeElapsed: percentageOfTimeElapsed,
                            percentageOfWork: percentageOfWork,
                            workDone: (percentageOfTimeElapsed - percentageOfWork),
                            percentageOfWork_in_progress: percentageOfWork_in_progress,
                            work_in_progress: (percentageOfWork_in_progress == 0 ? percentageOfWork_in_progress : percentageOfTimeElapsed - percentageOfWork_in_progress),
                            sprintStartDateStr: sprintStartDateStr,
                            sprintEndDateStr: sprintEndDateStr,
                            currentDateStr: currentDateStr,
                            daysFromStart: daysFromStart,
                            wholeSprintDuration: wholeSprintDuration,
                        }]);

                    }
                    // }
                }
            } catch (error) {
                console.error("Error fetching active sprints:", error);
                // Handle error
            }
        }

        setDataFetched(true)
        // console.log(dataFetched)
    }

    const checkUserLoggedIn = async () => {
        try {
            const User = JSON.parse(sessionStorage.getItem('user'))

            if (User) {
                setLoggedInUser(User)
                if (
                    location.pathname === "/login"
                ) {
                    navigate("/mobiusIntelliBoard/operationalDashboard", { replace: true });
                    console.log("user is logged in and login is not accessible")
                } else {
                    navigate(location.pathname ? location.pathname : "/");
                }
            } else {
                navigate("/login", { replace: true });
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (dataFetched) {
            const slider = setInterval(() => {
                setSprintCount(prev => prev + 1);
            }, 30000);

            return () => clearInterval(slider);
        }
    }, [dataFetched]);

    useEffect(() => {
        if (sprintCount <= activeBoards.length - 1) {
            setSelectedBoardSprint(prev =>
                activeBoards[sprintCount]?.sprint_name
            )
            setSelectedBoardName(prev =>
                activeBoards[sprintCount]?.board_name)

        } else {
            setSprintCount(0)
        }

        // console.log(sprintCount, "sprintCount");
    }, [sprintCount]);

    useEffect(() => {
        checkUserLoggedIn()
        setSummarySprintLoader(true)
        setNavItem(window.location.pathname.split("/")[1])
        // get_boards_active_sprint()
        get_activeboards()
        // getAllboards()
        // update_active_sprint(json_data)
        const intervalId = setInterval(() => {
            setActiveBoards([])
            setSprintPieChart([])
            setSprintBarChart([])
            get_boards_active_sprint();

        }, 3 * 60 * 60 * 1000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId)
    }, []);



    useEffect(() => {
        get_git_data()

    }, [activeBoards])


    useEffect(() => {
        get_boards_active_sprint()
    }, [boardsData])

    return (
        <MainContext.Provider value={{
            darkMode, navItem, setNavItem, setDarkMode, sprintProgressToolTip, setSprintProgressToolTip, dataFetched,
            setDataFetched, boardsData, setBoardsData, summaryProgress, setSummaryProgress, activeBoards, setActiveBoards,
            selectedBoardSprint, setSelectedBoardSprint, loggedInUser, setLoggedInUser,
            selectedBoardName, setSelectedBoardName, summarySprintLoader, setSummarySprintLoader, sprintBarChart, setSprintBarChart, sprintPieChart, setSprintPieChart, gitLogs, setGitLogs
        }}>
            {children}
        </MainContext.Provider>
    )
}