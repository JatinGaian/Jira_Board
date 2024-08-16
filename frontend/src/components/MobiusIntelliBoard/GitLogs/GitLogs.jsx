import React, { useContext, useEffect, useState } from 'react'
import css from './GitLogs.module.scss'
import AccordionArrow from '../../../assets/MIB/AccordionArrow';
import { SrdpContext } from '../Context/SrdpContext';
import Commits from './commits/commits';
import GitIcon from '../../../assets/MIB/gitLogs.png';

// 
{/* <TimeAgo
    className={css.timeStamp}
    datetime={commit?.authorTimestamp}
/> */}


const GitLogs = () => {

    const [expanded, setExpanded] = useState(false)
    const [teamsSelected, setTeamsSelected] = useState(true)
    const [teamView, setTeamView] = useState(false)
    const { sprintMembers, stories_data, gitLogsForSprint } = useContext(SrdpContext)
    // console.log(gitLogsForSprint, "gitLogs in sprintView")

    return (

        <div className={css.teamsContainer} id={`${expanded ? css.expanded : ""}`}>
            <div className={css.header} onClick={() => setExpanded(!expanded)}>
                <span>
                    <img src={GitIcon} alt="" />
                    <p>
                        Git Logs
                    </p>
                </span>
                <span>
                    {gitLogsForSprint?.length > 0 && (<AccordionArrow
                        style={{
                            transform: `${expanded ? "rotate(180deg)" : "none"}`,
                            transition: "transform 0.3s ease"
                        }} />)}
                </span>
            </div>
            <div className={css.content}>
                {(gitLogsForSprint?.length > 0 && gitLogsForSprint?.sort((a, b) => new Date(b.commitTimeStamp) - new Date(a.commitTimeStamp)).map((commit, index) => (
                        <Commits key={index} data={commit} />
                    )))
                }
            </div>
        </div>
    )
}

export default GitLogs