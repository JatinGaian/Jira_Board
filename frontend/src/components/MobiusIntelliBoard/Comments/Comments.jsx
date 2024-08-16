import React, { useContext, useEffect, useState } from 'react'
import css from './Comments.module.scss'
import { SrdpContext } from '../Context/SrdpContext'
import Sprints from '../../../assets/MIB/sprints'
import LeftComma from '../../../assets/MIB/LeftComma'
import RightComma from '../../../assets/MIB/RightComma'
import DeleteIcon from '../../../assets/MIB/DeleteIcon'
import ShareIcon from '../../../assets/MIB/ShareIcon'
import SubmitComment from '../../../assets/MIB/SubmitComment'
import { MainContext } from '../../../MainContext/MainContext'
import { DateFormatter } from '../../../utils/DateFormatter'
import axios from 'axios'
import toast from 'react-hot-toast'

const live_base_url = import.meta.env.VITE_live_base_url;


const Comments = (props) => {
    const { previousComments, setPreviousComments, commentContent, setCommentContent, comment, setComment, } = useContext(SrdpContext)
    const { loggedInUser } = useContext(MainContext)
    const [user, setUser] = useState("user")
    const [commentsData,setCommentsData] = useState([])
    const getComments = async () => {
        const commentsData = await axios.get(`${live_base_url}/getAllComments`)
        setCommentsData(commentsData?.data?.comments)
        console.log(commentsData)
    }
    const saveComment = async () => {
        const commentObject = {
            author: loggedInUser?.name,
            email: loggedInUser?.email,
            commentMessage: commentContent,
            commentLevel: props?.level,
            boardId: props?.boardId ?? null,
            sprintId: props?.sprintId ?? null,
        }

        const saveComment = await axios.post(`${live_base_url}/saveComment`, commentObject)
        setComment({ ...comment, addingComment: false })
        setCommentContent("")
        toast.success(saveComment?.data?.message, {
            duration: 1000,
            position: 'top-center',
            iconTheme: {
                primary: '#5e43d8',
                secondary: 'white',
            },
        })
        console.log(saveComment)


    }

    useEffect(() => {
        getComments()
    }, [])
    return (
        <div className={css.mainContainer}>
            <div className={css.commentSection} style={{ display: `${comment.addingComment ? "block" : "none"}` }}>
                {user !== "Admin" && <div className={css.addComment}>
                    <Sprints />
                    <div className={css.commentField}>
                        <input
                            value={commentContent}
                            onChange={(e) => setCommentContent(e.target.value)}
                            type="text"
                            placeholder='Add you comment here'
                        />
                        {
                            commentContent.length > 0 &&
                            (<SubmitComment style={{ cursor: "pointer" }} onClick={() => saveComment()} />)
                        }
                    </div>
                </div>}
                {
                    commentsData?.length > 0 && (
                        <>
                            <div className={css.pastComments}>
                                {
                                    user == "Admin" ? (
                                        <div className={css.sectionHeading}>
                                            <Sprints /> <p>Madhav's comments</p>
                                        </div>
                                    ) : (
                                        <div className={css.sectionHeading} style={{ paddingLeft: "1.8rem" }}>
                                            Previous Comments
                                        </div>
                                    )
                                }
                                <div className={css.comment}>
                                    <div>
                                        <LeftComma />
                                        <div>
                                            {
                                                commentsData[0]?.commentMessage
                                            }
                                        <RightComma className={css.rightComma} />
                                        </div>
                                    </div>
                                    <div>
                                        <span>
                                            <p>{DateFormatter(commentsData[0]?.createdAt)}</p>
                                        </span>
                                        <span>
                                            <DeleteIcon />
                                            <p>Delete</p>
                                        </span>
                                        <span>
                                            <ShareIcon />
                                            <p>Share</p>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className={css.moreComments}>
                                <p>
                                    See past comments
                                </p>
                            </div>
                        </>
                    )
                }

            </div>
        </div>
    )
}

export default Comments