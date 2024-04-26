import React, { useContext, useState } from 'react';
import css from './TicketsTable.module.scss';
import bookMark from '../../assets/bookmark.svg';
import inprogress from '../../assets/stopwatch.png';
import todo from '../../assets/todo.png';
import done from '../../assets/done.png';
import code from '../../assets/code.png';
import moment from 'moment';
import { SrdpContext } from '../../Context/SrdpContext';

const TicketsTable = ({ stories_data }) => {
    const uniqueStatusNames = [...new Set(stories_data.map(item => item.status_name))];
    const [selected, setSelected] = useState({});
    const { membersFilter, setMembersFilter, storiesLength, setStoriesLength, storyData, setStoryData } = useContext(SrdpContext);
    const { filteredStoriesLength, setFilteredStoriesLength } = useState([]);

    const toggleSelected = (storyId) => {
        setSelected(prevState => ({
            [storyId]: !prevState[storyId]
        }));
    };

    // console.log(storyData, "setStoryData(story)");
    const getDate = (date) => moment(date).format("MMM Do YYYY, h:mm:ss A");

    return (
        <div className={css.mainContainer}>
            {uniqueStatusNames.map((statusName) => {
                const filteredStories = stories_data.filter(story => story.status_name === statusName);
                const length = filteredStories.length;
                return (
                    <div className={css.columns} key={statusName}>
                        <div className={css.heading}>
                            <span>
                                {
                                    statusName == "To Do" ? <img src={todo} alt="" /> : statusName == "In Progress" ? <img src={inprogress} alt="" /> : statusName == "Done" ? <img src={done} alt="" /> : <img src={code} alt="" />
                                }
                                <p>{statusName}</p>
                            </span>
                            <p>{length}</p>
                        </div>
                        <div className={css.content}>
                            {filteredStories.map((story) => (
                                <div
                                    key={story.story_id}
                                    className={`${css.ticket} ${selected[story.story_id] ? css.selected : null}`}
                                    onClick={() => {
                                        toggleSelected(story.story_id);
                                        setStoryData(story);
                                        // setMembersFilter(story.assignee)
                                    }}>

                                    <div className={css.header}>
                                        <img src={bookMark} alt="" />
                                        <p title={story.story_name}>{story.story_name}</p>
                                    </div>
                                    <div className={css.attributes}>
                                        <p>{`Hygiene: ${story.story_ac_hygiene}`}</p>
                                        <p>{`Due: ${story.duedate}`}</p>
                                        <p>{`Updated at: ${getDate(story.updated)}`}</p>
                                        <p>{`Assigned To: ${story.assignee}`}</p>
                                    </div>
                                    <p>
                                        {`SP: ${story.story_points}`}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default TicketsTable;
