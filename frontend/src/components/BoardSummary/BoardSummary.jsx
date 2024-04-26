import React, { useContext, useEffect, useState } from 'react'
import css from './BoardSummary.module.scss'
import { useParams, useSearchParams } from 'react-router-dom';
import MainLoader from '../loaders/MainLoader';
import TicketsTable from '../TicketsTable/TicketsTable';
import { SrdpContext } from '../../Context/SrdpContext';
import Detail_view from '../DetailView/Detail_view';
import StoriesSkeletonLoading from '../StoriesSkeletonLoading/StoriesSkeletonLoading';
import pieChart from '../../assets/pieChartOutlined.png'
import barChart from '../../assets/barGraphOutlined.png'
import restartBlue from '../../assets/restartBlue.png'
import lead from '../../assets/lead.png'
import cross from '../../assets/cross.svg'

import Alerts from '../Alerts';
import { getSprints, getSprintMembers, getStories, past_sprint_data, getStoriesBarChartData, getSubtasks, gettopAssignee, get_project_data, get_single_barchart, findSubtask } from '../../service/service';

const BoardSummary = () => {
  const { boardId, boardName } = useParams();
  const { membersFilter, setMembersFilter, storiesLength,
    setStoriesLength, setStoriesBarChart, story_points_chart,
    setStory_points_chart, rock_star, isChartLoading, setIsChartLoading,
    setRock_star, showBarGraph, setShowBarGraph, singlePieChart, setSinglePieChart, selectedSprint, setSelectedSprint,
    selectedSprintFromSummary, setSelectedSprintFromSummary, pie_loader, setPie_loader, sprints_subtasks, setSprints_subtasks, breadCrumbs, setBreadCrumbs, meta_data, setMeta_data, storyData, setStoryData, lastClosed, setLastClosed, sprintLoader, setSprintLoader, membersLoader, setMembersLoader, sprintMembers, setSprintMembers, sprintIdState, setSprintIdState, sprint, setSprint, storiesLoader, setStoriesLoader, stories_data, setStories_data, ac_hygine, setAc_hygine, past_sprint_heros, setPast_sprint_heros, trust_worthy, setTrust_worthy, problem_solver, setProblem_solver, project_lead, setProject_lead
  } = useContext(SrdpContext)




  const filteredStories = stories_data.filter((stories) =>
    stories.assignee.toLowerCase().includes(membersFilter.toLowerCase())
  );
  setStoriesLength(filteredStories.length);


  useEffect(() => {
    setBreadCrumbs({
      ...breadCrumbs, home: "home", summaryBoard: "Summary Dashboard", boardSummary: boardName
    })
    getSprints(boardId, setSprintLoader, sprint, setSprint, selectedSprint, setSprintIdState, setSelectedSprint, setBreadCrumbs, setLastClosed, selectedSprintFromSummary, boardName, breadCrumbs);
    getSubtasks(setPie_loader, boardId, setSprints_subtasks);
    gettopAssignee(setPie_loader, boardId, setTrust_worthy, setProblem_solver)
    get_project_data(boardId, setProject_lead)
  }, [boardId, boardName]);
  useEffect(() => {
    if (sprint.length > 0) {
      getSprintMembers(selectedSprintFromSummary !== null ? selectedSprintFromSummary : sprint[0]?.id, setMembersLoader, setSprintMembers, setSprintIdState, sprint, setMembersFilter);
      getStories(selectedSprintFromSummary !== null ? selectedSprintFromSummary : sprint[0]?.id, setIsChartLoading, setStoriesLoader, setStories_data, setRock_star, setAc_hygine, membersFilter);
      past_sprint_data(lastClosed, setStoriesLoader, setPast_sprint_heros);
    }
  }, [sprint]);

  useEffect(() => {
    getStoriesBarChartData(setStoriesBarChart, setIsChartLoading, stories_data, filteredStories)
    get_single_barchart(filteredStories, setMeta_data, setStory_points_chart)
  }, [stories_data, membersFilter]);



  return (
    <div className={css.mainContainer}>
      <div className={css.mainContent}>
        <div className={css.left}>
          <div className={css.top}>
            <div className={css.sprintContainer}>
              <div className={css.header}>
                <span>
                  <p>All Sprints</p>
                  <p>{sprint.length}</p>
                </span>
                <div className={css.status}>
                  <span>Active</span>
                  <span>Selected</span>
                  <span>Closed</span>
                </div>
              </div>
              <div className={css.tagsContainer} id={sprintLoader ? css.loaderContainer : null}>
                {sprintLoader ?
                  <MainLoader heading={"sprints ...."} /> : (
                    sprint && sprint?.map((sprint, index) => (
                      <div
                        key={index}
                        className={`${css.tags} ${sprint.state === "closed" ? css.closed : css.active}`}
                        id={sprint.name === selectedSprint ? css.selected : null}
                        onClick={() => {
                          setSelectedSprint(sprint.name === selectedSprint ? sprint.name : sprint.name);
                          setBreadCrumbs({ ...breadCrumbs, sprint: sprint.name })
                          if (selectedSprint !== sprint.name || selectedSprint == null) {
                            getSprintMembers(sprint.id, setMembersLoader, setSprintMembers, setSprintIdState, sprint, setMembersFilter)
                            getStories(sprint.id, setIsChartLoading, setStoriesLoader, setStories_data, setRock_star, setAc_hygine, membersFilter)
                            // findSubtaskBysprint(sprint.id)
                            setShowBarGraph(true)
                          }
                        }}
                      >
                        {sprint.name}
                      </div>
                    ))
                  )}
              </div>

            </div>
            <div className={css.membersContainer}>
              <div className={css.header}>
                <span>
                  <p>{`${selectedSprint ? selectedSprint : ""}`}</p>
                  <p>Members</p>
                  <p>{sprintMembers?.length ? sprintMembers?.length : 0}</p>
                </span>
                <div className={css.status}>
                  <div>
                    <p></p>
                    <p>Sprint Rockstar</p>
                  </div>
                </div>
              </div>
              <div className={css.tagsContainer} id={membersLoader ? css.loaderContainer : null}>
                {membersLoader ?
                  <MainLoader heading={"members...."} /> : (
                    sprintMembers && sprintMembers?.map((members, index) => (
                      <div
                        key={index}
                        className={`${css.tags} ${css.membersTags}`}
                        id={members.sprint_member_full_name === membersFilter ? css.selected : null}
                        onClick={() => {
                          if (membersFilter !== members.sprint_member_full_name) {
                            setMembersFilter(members.sprint_member_full_name);
                            getStoriesBarChartData(setStoriesBarChart, setIsChartLoading, stories_data, filteredStories);
                          }
                        }}
                      >
                        {/* <img src={badge} alt="" /> */}
                        {(rock_star?.some(data => data.assignee === members?.sprint_member_full_name) ? <span></span> : null)}
                        <p>{members.sprint_member_full_name}</p>
                      </div>
                    ))
                  )}
              </div>
              <img className={membersFilter != "" || storyData.story_id != "" ? css.show : css.hide} src={restartBlue} onClick={() => {
                setMembersFilter("");
                setStoryData({ original_estimate: "Select story", remaining_estimate: "Select story", time_spent: "Select story", story_reviewers: "Select story", story_id: "" });
              }} alt="" />
            </div>
          </div>
          <div className={css.bottom}>
            {
              storiesLoader ?
                <StoriesSkeletonLoading storiesLength={storiesLength} /> :
                <>
                  <div className={css.StoriesHeading}>
                    <span>
                      <p>Stories</p>
                      <p>{storiesLength}</p>
                    </span>
                    {membersFilter && <div className={css.memberFilter}>
                      {membersFilter}
                      <svg
                        onClick={() => setMembersFilter("")}
                        width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* <circle opacity="1" cx="8.5" cy="8" r="8" fill="#bb86fc1f" />  */}
                        <path d="M6.5 6L10.5 10" stroke="#bb86fc" stroke-linecap="round" />
                        <path d="M10.5 6L6.5 10" stroke="#bb86fc" stroke-linecap="round" />
                      </svg>
                    </div>}
                  </div>
                  <TicketsTable stories_data={filteredStories} />
                </>
            }
          </div>
        </div>
        <div className={css.right}>
          <div className={css.rightHeader}>
            <div>
              <img src={lead} alt="" />
              {project_lead && project_lead}
            </div>
            <span>
              <img src={pieChart} id={!showBarGraph ? css.selected : ""} onClick={() => setShowBarGraph(false)} alt="" />
              <img src={barChart} id={showBarGraph ? css.selected : ""} onClick={() => setShowBarGraph(true)} alt="" />
            </span>
          </div>
          <div className={css.mainRightContent}>
            <Detail_view meta_data={meta_data} past_sprint_heros={past_sprint_heros} trust_worthy={trust_worthy} problem_solver={problem_solver} stories_data={stories_data} ac_hygine={ac_hygine} getStories={getStories} getSprintMembers={getSprintMembers} />

          </div>
        </div>
        <Alerts />
      </div>
    </div>
  )
}

export default BoardSummary