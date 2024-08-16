import React, { useContext, useEffect, useState } from 'react'
import css from './Teams.module.scss'
import TeamsIcon from '../../../assets/MIB/TeamsIcon'
import MemberIcon from '../../../assets/MIB/MemberIcon'
import Accordion from 'react-bootstrap/Accordion';
import AccordionArrow from '../../../assets/MIB/AccordionArrow';
import { transform } from 'framer-motion';
import { SrdpContext } from '../Context/SrdpContext';
import MembersDetails from './MembersDetails/MembersDetails';

const Teams = () => {
   
    const [expanded, setExpanded] = useState(true)
    const [teamsSelected, setTeamsSelected] = useState(true)
    const [teamView, setTeamView] = useState(false)
    const { sprintMembers, stories_data } = useContext(SrdpContext)

    return (

        <div className={css.teamsContainer} id={`${expanded ? css.expanded : ""}`}>
            <div className={css.header} onClick={() => setExpanded(!expanded)}>
                <span>
                    <TeamsIcon fill={"white"} strokecolor="black" />
                    <p>
                        Teams
                    </p>
                </span>
                <span>
                    <AccordionArrow
                        style={{
                            transform: `${expanded ? "rotate(180deg)" : "none"}`,
                            transition: "transform 0.3s ease"
                        }} />
                </span>
            </div>
            <div className={css.tabsContainer}>
                <div className={css.tabs}>
                    <span className={teamsSelected ? css.selected : ""} onClick={(e) => setTeamsSelected(true)}>Teams</span>
                    <span className={!teamsSelected ? css.selected : ""} onClick={(e) => setTeamsSelected(false)} >Past Sprint Heroes</span>
                </div>
                <div className={css.select}>
                    <TeamsIcon onClick={(e) => setTeamView(true)} fill={`${teamView ? "#7C5CFC" : "#F5F6F7"}`} strokecolor={`${teamView ? "white" : "#758195"}`} />
                    <MemberIcon onClick={(e) => setTeamView(false)} fill={`${!teamView ? "#7C5CFC" : "#F5F6F7"}`} strokeColor={`${!teamView ? "white" : "#758195"}`} />
                </div>

            </div>
            <div className={css.content}>
                {
                    teamView ? (
                        <MembersDetails membersLength={sprintMembers?.length} projectData={stories_data[0]?.projectData} />
                    ) : (sprintMembers.length > 0 && sprintMembers?.map((member, index) => (
                        <MembersDetails key={index} data={member} />
                    ))) 
                }
            </div>
        </div>
    )
}

export default Teams