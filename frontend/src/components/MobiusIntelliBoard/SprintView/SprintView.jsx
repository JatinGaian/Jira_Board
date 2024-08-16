import React, { useContext, useEffect, useState } from 'react'
import css from './SprintView.module.scss'
import { useNavigate, useParams } from 'react-router-dom';
import { SrdpContext } from '../Context/SrdpContext';
import { getStories, getGitLogsForSprint } from '../service/service';
import ProgressBar from "@ramonak/react-progress-bar";
import BurnDownChart from '../Charts/BurnDownChart';
import { format, parse, eachDayOfInterval, isAfter } from 'date-fns';
import SprintStories from '../SprintStories/SprintStories';
import SprintTimeline from '../../../assets/MIB/SprintTimeline';
import Teams from '../Teams/Teams';
import GitLogs from '../GitLogs/GitLogs';


const SprintView = () => {
  const navigate = useNavigate()
  const { sprintId, boardId, boardName } = useParams();
  const { membersFilter, setIsChartLoading,
    setRock_star, selectedSprintFromSummary, sprint, setStoriesLoader, selectedSprint,
    stories_data, setStories_data, setProblem_solver, setAc_hygine, storyData, setStoryData,
    setSprintMembers, gitLogsForSprint, setGitLogsForSprint
  } = useContext(SrdpContext)
  const [data, setData] = useState([]);

  const totalStoryPoints = stories_data?.reduce((totalPoints, story) => {
    return totalPoints + (story.story_points || 0);
  }, 0)
  const doneStoryPoints = stories_data?.filter((story) => story.story_status === "Done").reduce((totalPoints, story) => {
    return totalPoints + (story.story_points || 0);
  }, 0)

  useEffect(() => {
    console.log(stories_data)
    if (stories_data.length > 0) {
      const sprintStart = stories_data[0]?.sprint_start;
      const sprintEnd = stories_data[0]?.sprint_end;
      const startDate = parse(sprintStart, "MMM do yyyy, h:mm:ss a", new Date());
      const endDate = parse(sprintEnd, "MMM do yyyy, h:mm:ss a", new Date());
      const days = eachDayOfInterval({ start: startDate, end: endDate }); 
      let totalPoints = stories_data?.reduce((totalPoints, story) => {
        return totalPoints + (story.story_points || 0);
      }, 0)
      let idealBurnDown = stories_data?.reduce((totalPoints, story) => {
        return totalPoints + (story.story_points || 0);
      }, 0)
      const doneStories = stories_data.filter((story) => story.status_name == "Done")
      console.log(doneStories)
      let tempData = [];

      days.forEach((day, index) => {
        const isFutureDate = isAfter(day, new Date());
        const pointsDone = doneStories.filter(story =>
          story.storyHistory.some(history =>
            history.changedTo === "Done" && history.timeLog.split(',')[0] === format(day, "MMM do yyyy")
          )
        ).reduce((totalPoints, story) => {
          return totalPoints + (story.story_points || 0);
        }, 0)
        totalPoints = totalPoints - pointsDone
        console.log("")

        tempData.push({
          indexing: index + 1,
          day: format(day, "MMM do"), // Format the date as 'Tue Jul 30 2024'
          storyPoints: isFutureDate ? null : totalPoints,
          idealBurnDown: (idealBurnDown - (index * (idealBurnDown / (days.length - 1)).toFixed(0))) <= 0 ? 0 : idealBurnDown - (index * (idealBurnDown / (days.length - 1)).toFixed(0)),
          sprintName: stories_data[0]?.sprint_name
        });
      });

      console.log(tempData, "tempData")
      setData(tempData);
    }
  }, [stories_data.length > 0]);


  useEffect(() => {
    setStories_data([])
    setGitLogsForSprint([])
    setSprintMembers([])
    getStories(selectedSprintFromSummary !== null ? selectedSprintFromSummary : sprintId, boardId, boardName, setIsChartLoading, setStoriesLoader, setStories_data, setRock_star, setAc_hygine, membersFilter, storyData, setStoryData, setProblem_solver, setSprintMembers);
    getGitLogsForSprint(boardName, boardId, sprintId,  stories_data[0]?.sprint_name , setGitLogsForSprint)
  }, [])
  return (
    <div className={css.mainContainer}>
      <div className={css.sprintInfo}>
        <div className={css.breadcrumb}>
          <p onClick={() => navigate('/mobiusIntelliBoard/operationalDashboard')}>
            Operational Dashboard
          </p>
          <p>/</p>
          <p>{stories_data[0]?.sprint_name?? "Sprint"}</p>
        </div>
        <p>{stories_data[0]?.sprint_name??"Sprint"}</p>
        <p>{boardName}</p>
      </div>
      <div className={css.cardsContainer}>
        <div className={css.card}>
          <div className={css.info}>
            <ProgressBar
              height='5px'
              // width='100'
              baseBgColor={"#F1F2F3"}
              bgColor='#719919'
              maxComplete={100}
              isLabelVisible={false}
              completed={
                ((stories_data[0]?.daysSpent / stories_data[0]?.sprintDuration) * 100).toFixed(2)
              } />
            <div>
              <p>
                {isNaN(stories_data[0]?.sprintDuration - stories_data[0]?.daysSpent) ? 0 : (stories_data[0]?.sprintDuration - stories_data[0]?.daysSpent)}
              </p>
              <p>
                {(stories_data[0]?.sprintDuration - stories_data[0]?.daysSpent) > 1 ? " days left" : "day left"}
              </p>
            </div>

          </div>
          <div className={css.sprintDetails}>
            <p>
              {stories_data[0]?.sprintDuration ?? "0"}
            </p>
            <p>
              {
                `${stories_data[0]?.sprint_start.split(',')[0].slice(0, -5) ?? "start Date"}- ${stories_data[0]?.sprint_end.split(',')[0].slice(0, -5) ?? "End date"}`
              }
            </p>
          </div>
          <p>Sprint length</p>
        </div>
        <div className={css.card}>
          <div className={css.info}>
            <ProgressBar
              height='5px'
              // width='100'
              baseBgColor={"#F1F2F3"}
              bgColor='#719919'
              maxComplete={100}
              isLabelVisible={false}
              completed={
                ((stories_data?.filter((story) => story.story_status === "Done").length / stories_data.length) * 100).toFixed(2)
              } />
            <div>
              <p>
                {totalStoryPoints
                  -
                  doneStoryPoints ?? 0}
              </p>
              <p>
                {(stories_data?.length - stories_data?.filter((story) => story.story_status === "Done").length) > 1 ? " story points left" : "story point left"}
              </p>
            </div>
          </div>
          <div className={css.sprintDetails}>
            <p>
              {stories_data?.filter((story) => story.story_status === "Done").reduce((totalPoints, story) => {
                return totalPoints + (story.story_points || 0);
              }, 0)}
            </p>
            <p>
              {
                `/${stories_data?.reduce((totalPoints, story) => {
                  return totalPoints + (story.story_points || 0);
                }, 0)}`
              }
            </p>
          </div>
          <p>Story Points Completed</p>
        </div>

      </div>
      <div className={css.content}>
        <div className={css.left}>
          <div className={css.burnDownChartContainer}>
            <div className={css.heading}>
              Burndown Chart
            </div>
            <div className={css.burnDownChart}>
              <BurnDownChart data={data} />
            </div>
          </div>
          <div className={css.sprintStoriesContainer}>
            <div className={css.storiesHeading}>
              <div>
                <SprintTimeline />
                <p>
                  Sprint Timeline
                </p>
              </div>
              <div>
                <p>
                  {totalStoryPoints}
                </p>
                <p>
                  Story Points
                </p>
              </div>
            </div>
            <SprintStories />
          </div>
        </div>
        <div className={css.right}>
          <Teams />
          <GitLogs/>
        </div>
      </div>

    </div>
  )
}

export default SprintView