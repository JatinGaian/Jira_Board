import React from 'react'
import css from './StoriesSkeletonLoading.module.scss'

const StoriesSkeletonLoading = ({ storiesLength }) => {
    return (
        <div className={`${css.mainContainer}`}>
            <p className={css.skeletonLoading}></p>
            <div className={css.loading}>
                <div>
                    <span>
                        <p className={css.skeletonLoading}></p>
                    </span>
                    <div className={`${css.content} }`}>
                        <div className={`${css.card}`}>
                            <p className={css.skeletonLoading}></p>
                            <p className={css.skeletonLoading}></p>
                            <p className={css.skeletonLoading}></p>
                            <p className={css.skeletonLoading}></p>
                        </div>
                        <div className={`${css.card}`}>
                            <p className={css.skeletonLoading}></p>
                            <p className={css.skeletonLoading}></p>
                            <p className={css.skeletonLoading}></p>
                            <p className={css.skeletonLoading}></p>
                        </div>
                        <div className={`${css.card}`}>
                            <p className={css.skeletonLoading}></p>
                            <p className={css.skeletonLoading}></p>
                            <p className={css.skeletonLoading}></p>
                            <p className={css.skeletonLoading}></p>
                        </div>
                    </div>
                </div>
                <div>
                    <span>
                        <p className={css.skeletonLoading}></p>
                    </span>
                    <div className={`${css.content} }`}>
                        <div className={`${css.card}`}>
                            <p className={css.skeletonLoading}></p>
                            <p className={css.skeletonLoading}></p>
                            <p className={css.skeletonLoading}></p>
                            <p className={css.skeletonLoading}></p>
                        </div>
                        <div className={`${css.card}`}>
                            <p className={css.skeletonLoading}></p>
                            <p className={css.skeletonLoading}></p>
                            <p className={css.skeletonLoading}></p>
                            <p className={css.skeletonLoading}></p>
                        </div>
                    </div>
                </div>
                <div>
                    <span>
                        <p className={css.skeletonLoading}></p>
                    </span>
                    <div className={`${css.content} }`}>
                        <div className={`${css.card}`}>
                            <p className={css.skeletonLoading}></p>
                            <p className={css.skeletonLoading}></p>
                            <p className={css.skeletonLoading}></p>
                            <p className={css.skeletonLoading}></p>
                        </div>
                        <div className={`${css.card}`}>
                            <p className={css.skeletonLoading}></p>
                            <p className={css.skeletonLoading}></p>
                            <p className={css.skeletonLoading}></p>
                            <p className={css.skeletonLoading}></p>
                        </div>
                        <div className={`${css.card}`}>
                            <p className={css.skeletonLoading}></p>
                            <p className={css.skeletonLoading}></p>
                            <p className={css.skeletonLoading}></p>
                            <p className={css.skeletonLoading}></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StoriesSkeletonLoading