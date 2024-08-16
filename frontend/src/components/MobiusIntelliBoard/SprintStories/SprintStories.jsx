import React, { useContext, useState } from 'react';
import css from './SprintStories.module.scss';
import bookMark from '../../../assets/bookmark.svg';
import inprogress from '../../../assets/stopwatch.png';
import todo from '../../../assets/todo.png';
import done from '../../../assets/done.png';
import code from '../../../assets/code.png';
import LinkIcon from '../../../assets/link.svg'
import nodata from '../../../assets/nodata.png'

import moment from 'moment';
import { SrdpContext } from '../Context/SrdpContext';
import { use } from 'echarts';
import { useParams } from 'react-router-dom';
import { MainContext } from '../../../MainContext/MainContext';
import Todo from '../../../assets/MIB/Todo';
import InProgress from '../../../assets/MIB/InProgress';
import Done from '../../../assets/MIB/Done';
import LinkArrow from '../../../assets/MIB/LinkArrow';
import Calendar from '../../../assets/MIB/Calendar';
import Assignee from '../../../assets/MIB/Assignee';
import Attachment from '../../../assets/MIB/Attachment';

const SprintStories = () => {
    const { boardId } = useParams()
    const { storyData, story_id, setStoryData, stories_data } = useContext(SrdpContext);
    const uniqueStatusNames = [...new Set(stories_data?.map(item => item.status_name))];
    const { darkMode } = useContext(MainContext);
    const [selected, setSelected] = useState({
        [stories_data?.length > 0 ? stories_data[0]?.story_id : null]: true
    });
    const { filteredStoriesLength, setFilteredStoriesLength } = useState([]);
    const toggleSelected = (storyId) => {
        setSelected(prevState => ({
            [storyId]: !prevState[storyId]
        }));
    };

    // console.log(stories_data, "stories_data");  
    const getDate = (date) => moment(date).format("MMM Do YYYY, h:mm:ss A");

    return (
        <div className={css.storiesContainer} id={!darkMode && css.lightMode}>
            {stories_data?.length ? (
                uniqueStatusNames.map((statusName) => {
                    const filteredStories = stories_data?.filter(story => story.status_name === statusName);
                    const length = filteredStories?.length;
                    return (
                        <div className={css.columns} key={statusName}>
                            <div className={css.heading}
                                style={{
                                    color: `${statusName == "To Do" ? "#3D81DB" : statusName == "In Progress" ? "#C4990F" : statusName == "Done" ? "#719919" : "#5e43d8"}`,
                                    background: `${statusName == "To Do" ? "#F5FBFF" : statusName == "In Progress" ? "#FBF6E7" : statusName == "Done" ? "#F6FBE9" : "#f3e7fb"}`

                                }}
                            >
                                <span>
                                    {
                                        statusName == "To Do" ? <Todo /> : statusName == "In Progress" ? <InProgress /> : statusName == "Done" ? <Done /> : <img src={code} alt="" />
                                    }
                                    <p>{statusName}</p>
                                </span>
                            </div>
                            <div className={css.content}>
                                {filteredStories?.map((story) => {
                                    return <div key={story.story_id}
                                        className={`${css.ticket} `}
                                        id={`${statusName == "To Do" ? css.todo : statusName == "In Progress" ? css.inprogress : statusName == "Done" ? css.done : css.normal}`}
                                        onClick={() => {
                                            toggleSelected(story.story_id);
                                            setStoryData(story);
                                        }}>

                                        <div className={css.header}>
                                            {
                                                statusName == "To Do" ? <img src={todo} alt="" /> : statusName == "In Progress" ? <img src={inprogress} alt="" /> : statusName == "Done" ? <img src={done} alt="" /> : <img src={bookMark} alt="" />
                                            }
                                            <p title={story.story_name}>{story.story_name}</p>
                                            <a href={`https://gaiansolutions.atlassian.net/jira/software/c/projects/${story?.project_key}/boards/${boardId}?selectedIssue=${story?.story_key}`} target="_blank" rel="noopener noreferrer">
                                               <LinkArrow/>
                                            </a>
                                        </div>
                                        <div className={css.attributes}>
                                            {/* <div>
                                                <div style={{ backgroundColor: `${statusName == "To Do" ? "#0080ff20" : statusName == "In Progress" ? `${darkMode ? "#c59d302f" : "#fddf364c"}` : statusName == "Done" ? "#05c6051a" : ""}`, color: `${statusName == "To Do" ? "#007bff" : statusName == "In Progress" ? "#c59d30" : statusName == "Done" ? "#0dac0d" : ""}` }}>
                                                    {`SP: ${story.story_points}`}
                                                </div>
                                            </div> */}
                                            <span> <Calendar/> <p title={story.duedate}>{story.duedate.split(',')[0]}</p></span>
                                            <span> <Assignee/> <p title={story.assignee}>{story.assignee}</p></span>
                                            <div>
                                                <span>
                                                    <p style={{
                                                        background: `${statusName == "To Do" ? "#3D81DB" : statusName == "In Progress" ? "#C4990F" : statusName == "Done" ? "#719919" : ""}`
                                                    }}>{story.story_points}</p>
                                                <p>{`Story  ${story.story_points > 1 ? "points" : "point"}` }</p>
                                                </span>
                                                <span>
                                                    <p>View</p>
                                                    <Attachment/>
                                                    <p>3</p>
                                                </span>
                                            </div>
                                        </div>

                                    </div>
                                }
                                )}
                            </div>
                        </div>
                    );
                })
            ) : (
                <div className={css.errorContainer}>
                    No Stories to show...
                    <img src={nodata} alt="" />
                </div>
            )}
        </div>
    );
};

export default SprintStories;
