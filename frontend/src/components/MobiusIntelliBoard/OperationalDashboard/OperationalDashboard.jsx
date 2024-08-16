import React, { useContext, useState } from 'react'
import css from './OperationalDashboard.module.scss'
import Sprints from '../../../assets/MIB/sprints'
import AddCommentButton from '../../../assets/MIB/AddCommentButton'

import SprintsProgressChart from '../Charts/SprintsProgressChart'
import { SrdpContext } from '../Context/SrdpContext'
import { MainContext } from '../../../MainContext/MainContext'
import SubmitComment from '../../../assets/MIB/SubmitComment'
import LeftComma from '../../../assets/MIB/LeftComma'
import RightComma from '../../../assets/MIB/RightComma'
import DeleteIcon from '../../../assets/MIB/DeleteIcon'
import ShareIcon from '../../../assets/MIB/ShareIcon'
import Comments from '../Comments/Comments'
import ProjectIcon from '../../../assets/MIB/ProjectIcon'
import IButton from '../../../assets/MIB/IButton'
import TeamsIcon from '../../../assets/MIB/TeamsIcon'

const OperationalDashboard = () => {
    const { setFilterSprintBarChart, setSelected, selected, comment, setComment, } = useContext(SrdpContext)
    const { darkMode, sprintBarChart, boardsData, activeBoards, dataFetched } = useContext(MainContext)
    const [tabs, setTabs] = useState({
        sprintView: true,
        projectView: false,
        teamView: false,
        empView: false

    })
    const [user, setUser] = useState("user")
    return (
        <div className={css.mainContainer}>
            <div className={css.tabsContainer}>
                <div className={css.breadcrumb}>
                    <p>
                        Operational Dashboard
                    </p>
                </div>
                <p>Operational Dashboard</p>
                <div className={css.tabs}>
                    <p className={tabs.sprintView ? css.selectedTab : css.tab} onClick={() => setTabs({ sprintView: true, projectView: false, teamView: false, empView: false })}>Sprint View</p>
                    <p className={tabs.projectView ? css.selectedTab : css.tab} onClick={() => setTabs({ sprintView: false, projectView: true, teamView: false, empView: false })}>Project View</p>
                    <p className={tabs.teamView ? css.selectedTab : css.tab} onClick={() => setTabs({ sprintView: false, projectView: false, teamView: true, empView: false })}>Team View</p>
                    <p className={tabs.empView ? css.selectedTab : css.tab} onClick={() => setTabs({ sprintView: false, projectView: false, teamView: false, empView: true })}>Employee View</p>
                </div>
            </div>
            <div className={css.cardsContainer}>
                <div className={css.card}>
                    <div className={css.info}>
                        <p>{activeBoards.length}</p>
                        <Sprints className={css.img} />
                    </div>
                    <p className={css.title}>Active Sprints</p>
                </div>
                <div className={css.card}>
                    <div className={css.info}>
                        <p>{boardsData.length}</p>
                        <ProjectIcon className={css.img} />
                    </div>
                    <p className={css.title}>Projects</p>
                </div>
                <div className={css.card}>
                    <div className={css.info}>
                        <p>
                            {activeBoards.length > 0
                                ? activeBoards.reduce((totalPoints, sprint) => {
                                    return totalPoints + (sprint.total_story_points || 0);
                                }, 0)
                                : 0}
                        </p>
                        <Sprints className={css.img} />
                    </div>
                    <p className={css.title}>Committed Story Points</p>
                </div>
                <div className={css.card}>
                    <div className={css.info}>
                        <p>
                            {activeBoards.length > 0
                                ? activeBoards.reduce((totalMembers, sprint) => {
                                    return totalMembers + (sprint?.members?.length || 0);
                                }, 0)
                                : 0}
                        </p>
                        <TeamsIcon fill={"white"} strokecolor="#7C5CFC" className={css.img} />
                    </div>
                    <p className={css.title}>Employees</p>
                </div>
                <div className={css.card}>
                    <div className={css.info}>
                        <p>
                            {
                                sprintBarChart?.filter(item => {
                                    return (item.percentageOfTimeElapsed - item.percentageOfWork >= 31 && item.percentageOfTimeElapsed - item.percentageOfWork <= 100);
                                }).length
                            }
                        </p>
                        <IButton className={css.img} />
                    </div>
                    <p className={css.title}>At risk sprints</p>
                </div>
                <div className={css.card}>
                    <div className={css.info}>
                        <p>
                            {activeBoards.length > 0
                                ? activeBoards.reduce((totalInProgressPoints, sprint) => {
                                    return totalInProgressPoints + (sprint?.total_inProgress_points || 0);
                                }, 0)
                                : 0}
                        </p>
                        <Sprints className={css.img} />
                    </div>
                    <p className={css.title}>In Progress</p>
                </div>
            </div>
            <div className={css.BarChartContainer}>
                <div className={css.heading}>
                    <p>Sprint Progress</p>
                    <div>
                    <AddCommentButton className={css.commentButton} fill={comment.addingComment ? "#7C5CFC" : "none"} onClick={(e) => setComment({ ...comment, addingComment: !comment.addingComment })} />
                    {
                        <Comments level="project"/>
                    }
                    </div>
                </div>
                <div className={css.barChart}>
                    <SprintsProgressChart id={"sprintProgress1"} />
                </div>
                <div className={css.legend}>
                    <div>
                        <span style={{ background: "#FBC96C" }}>

                        </span>
                        <p> {`> 20% behind`} </p>
                    </div>
                    <div>
                        <span style={{ background: "#EB856B" }}>

                        </span>
                        <p>{`> 30% behind`}</p>
                    </div>
                    <div>
                        <span style={{ background: "#ABDE3A" }}>

                        </span>
                        <p>On time</p>
                    </div>
                    <div>
                        <span style={{ background: "#9F84FD" }}>

                        </span>
                        <p>Ahead of time</p>
                    </div>
                    <div>
                        <span style={{ background: "#F5F6F7" }}>

                        </span>
                        <p>Time taken</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OperationalDashboard