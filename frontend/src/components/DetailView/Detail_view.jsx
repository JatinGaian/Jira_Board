import React, { useContext, useState } from 'react'
import SingleBarChart from '../Charts/SingleBarChart'
import css from './DetailView.module.scss'
import StoriesBarChart from '../Charts/StoriesBarChart'
import { SrdpContext } from '../../Context/SrdpContext'
import SummaryPieCharts from '../Charts/SummaryPieCharts'
import SubtaskPieChart from '../Charts/SubtaskPieChart'
import MainLoader from '../loaders/MainLoader'
import SmallLoader from '../loaders/SmallLoader'
import dots from '../../assets/dots.svg'
import i from '../../assets/i.png'


const Detail_view = ({ past_sprint_heros, problem_solver, trust_worthy, stories_data, ac_hygine, getStories, getSprintMembers }) => {
    const { storiesBarChart, story_points_chart, rock_star,
        setShowBarGraph, isChartLoading, pie_loader, setPie_loader,
        setIsChartLoading, singlePieChart, membersFilter, showBarGraph, sprints_subtasks, selectedSprint, setSelectedSprint, meta_data, storyData } = useContext(SrdpContext)
    const chartArray = ["chart1", "chart2", "chart3", "chart4", "chart5", "chart6", "chart7", "chart8", "chart9", "chart10", "chart11", "chart12"]
    const [showDetails, setShowDetails] = useState(false)
    const findSprint = async (sprintName) => {
        setShowBarGraph(!showBarGraph)
        if (selectedSprint !== sprintName || selectedSprint == null) {
            const foundSprint = sprint.find(sprint => sprint.name === sprintName);
            if (foundSprint) {
                getStories(foundSprint?.id)
                setSelectedSprint(foundSprint.name === selectedSprint ? foundSprint.name : foundSprint.name);
                getSprintMembers(foundSprint.id)
            } else {
                return null;
            }
        }

    }

    // console.log(meta_dat);   

    // console.log(sprints_subtasks, "sprints_subtasks");
    return (
        <div className={css.mainContainer}>
            <div className={css.chartAndGraph}>
                {showBarGraph ?
                    <>
                        <div>
                            <div>
                                <p >Story points</p>
                                <span>
                                    {membersFilter && <p>{membersFilter ? membersFilter : ""}</p>}
                                </span>
                            </div>
                            {
                                isChartLoading ?
                                    <div className={css.loaderContainer}>
                                        <MainLoader heading={"story points chart"} />
                                    </div>
                                    : (<SingleBarChart
                                        id="yourChartId"
                                        data={story_points_chart}
                                        // colors={["#50253f", "#943d73", "#ae4787", "#cc519d", "#da62ac", "#e774bb", "#f797d2", "#fdd0ec", "#ffecf8"]}
                                        // colors={["#0055cc", "#0c66e4", "#1d7afc", "#388bff", "#579dff", "#84b8ff", "#e9f2ff", "#fdd0ec", "#ffecf8"]} blue
                                        colors={["#463062", "#5c407e", "#73519c", "#8a62bb", "#8a62bb", "#bb86fc"]}
                                    />)}
                        </div>
                        <div>
                            <div>
                                <p>Work progress status</p>
                                <span>
                                    <img src={i} alt="" onClick={() => setShowDetails(!showDetails)} />
                                    <div className={css.details} id={showDetails ? css.show : css.hide}>
                                        <p>{`Sprint Start : ${storiesBarChart?.sprintStartDate}`}</p>
                                        <p>{`Sprint End : ${storiesBarChart?.sprintEndDate}`}</p>
                                        <p>{`Days spent : ${storiesBarChart?.daysSpent}`}</p>
                                        <p>{`Sprint Duration : ${storiesBarChart?.sprintDuration}`}</p>
                                    </div>
                                </span>
                            </div>
                            {
                                isChartLoading ?
                                    <div className={css.loaderContainer}>
                                        <MainLoader heading={"Status Bar Chart"} />
                                    </div> :
                                    (<StoriesBarChart id={"storiesBarChart"} storiesBarChart={storiesBarChart} />)
                            }
                        </div>
                    </>
                    : <div className={css.chartContainer}>
                        {
                            pie_loader ?
                                <div className={css.loadingContainer}>

                                    {
                                        (chartArray.map((content, index) => (
                                            index == 4 ?
                                                <div key={index} className={css.loader}>
                                                    <MainLoader heading={"Subtasks"} />
                                                </div> :
                                                <div key={index} className={css.loading}>

                                                </div>
                                        )))}
                                </div>
                                :
                                sprints_subtasks && Object.entries(sprints_subtasks).map(([sprintName, sprintData], index) => {

                                    const color = Object.keys(sprintData[0])[0] === "NO Subtask" ? "grey" : "#463062";
                                    return (
                                        <div onClick={(e) => {
                                            setSelectedSprint(sprintName)
                                            findSprint(sprintName)
                                            findSubtask(sprintName, sprintData)
                                        }} key={index}>
                                            <p title={sprintName}>{sprintName}</p>
                                            <SummaryPieCharts key={index} id={`chart ${index}`}
                                                sprintData={sprintData}
                                                sprintName={sprintName}
                                                color={[color, "#5c407e", "#73519c", "#8a62bb", "#8a62bb", "#bb86fc"]}
                                            />
                                        </div>
                                    )
                                })
                        }
                    </div>
                }
            </div>
            <div className={css.metaDataContainer}>
                <div className={css.header}>
                    <p>Metadata</p>
                </div>
                <div className={css.content}>
                    <div className={css.tiles}>
                        <p>
                            {`Mr.Trust Worthy`}
                        </p>
                        <div>
                            {trust_worthy == "" ? <SmallLoader /> :

                                trust_worthy?.map((heros, index) => (
                                    <div
                                        key={index}
                                        className={`${css.tags}`}
                                    >
                                        {heros?.assignee}
                                    </div>
                                )
                                )}
                        </div>
                    </div>
                    <div className={css.tiles}>
                        <p>
                            {`Mr.Problem Solver`}
                        </p>
                        <div>
                            {problem_solver == "" ? <SmallLoader /> :
                                problem_solver?.map((heros, index) => (
                                    <div
                                        key={index}
                                        className={`${css.tags}`}
                                    >
                                        {heros?.assignee}
                                    </div>
                                )
                                )}
                        </div>
                    </div>
                    <div className={css.tiles}>
                        <p>
                            {`Past Sprint Heros`}
                        </p>
                        <div>
                            {past_sprint_heros == "" ? <SmallLoader />
                                : past_sprint_heros?.map((heros, index) => (
                                    <div
                                        key={index}
                                        className={`${css.tags}`}
                                    >
                                        {heros?.assignee}
                                    </div>
                                )
                                )}
                        </div>
                    </div>
                    <div className={css.tiles_Predictability}>
                        <p>
                            {`On-Time Predictability`}
                        </p>
                        <div>
                            <p className={`${css.tags}`}>Total Subtasks : {meta_data.number_of_sub_tasks}</p>
                            <p className={`${css.tags}`}>Completed Subtasks : {meta_data.completed_sub_tasks}</p>
                            {/* <p className={`${css.tags}`}>Completed Subtasks : {stories_data[0]?.sprint_end} </p> */}
                        </div>
                        <div>
                            <p className={`${css.tags}`}>Sprint Start : {stories_data[0]?.sprint_start}</p>
                            <p className={`${css.tags}`}>Sprint End : {stories_data[0]?.sprint_end} </p>
                        </div>
                    </div>
                    <div className={css.tiles_timelog}>
                        <p>
                            {`Time log info `}
                        </p>
                        <div>
                            <p className={`${css.tags}`}>Original Estimate : {storyData.original_estimate}</p>
                            <p className={`${css.tags}`}>Remaining Estimate : {storyData.remaining_estimate}</p>
                            <p className={`${css.tags}`}>Time spent : {storyData.time_spent}</p>
                        </div>
                    </div>
                    <div className={css.tiles_ac}>
                        <p>
                            {`Story AC Hygiene `}
                        </p>
                        <div className={css.sc_data}>
                            <p className={`${css.tags}`}>AC added ~ {ac_hygine}</p>
                            {/* <p className={`${css.tags}`}>{ac_hygine}</p> */}
                        </div>

                    </div>

                    <div className={css.tiles_ac}>
                        <p>
                            {`Peer review info `}
                        </p>
                        <div>
                            <p className={`${css.tags}`}>Reviewers : {storyData.story_reviewers}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Detail_view
