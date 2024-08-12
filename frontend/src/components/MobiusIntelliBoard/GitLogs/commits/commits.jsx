import React from 'react'
import css from './commits.module.scss'
import CommitIcon from '../../../../assets/MIB/CommitIcon'
import TimeAgo from 'timeago-react'


const commits = (props) => {
    // console.log(props.data)
    return (
        <div className={css.mainContainer}>
            <CommitIcon />
            <div className={css.commitContent}>
                <div className={css.heading}>
                    <p>Commit</p>
                    <TimeAgo
                        className={css.timeStamp}
                        datetime={props.data.commitTimeStamp}
                    />
                </div>
                <p>{props.data.assignee}</p>
                <div>
                    {
                        props.data.commitMessage
                    }
                </div>
            </div>

        </div>
    )
}

export default commits