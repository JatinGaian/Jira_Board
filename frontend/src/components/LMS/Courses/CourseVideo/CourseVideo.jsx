import React, { useState, useContext, useRef, useEffect } from 'react';
import css from "./CourseVideo.module.scss";
import { CourseList } from './CourseVideoList.js';
import { MainContext } from '../../../../MainContext/MainContext';

const CourseVideo = () => {
  // State variables
  const [selectedCourse, setSelectedCourse] = useState(CourseList[0]); // Currently selected course
  const [currentChapter, setCurrentChapter] = useState(null); // Currently selected chapter
  const [completedChaptersMap, setCompletedChaptersMap] = useState({}); // Map of completed chapters for each course
  const [pausedTimes, setPausedTimes] = useState({}); // Map of paused times for each chapter
  const videoRef = useRef(null); // Reference to the video element

  // Function to handle clicking on a chapter
  const handleChapterClick = (chapter, index) => {
    // Check if the chapter is not completed
    if (!completedChaptersMap[selectedCourse.id]?.includes(index)) {
      // Set the current chapter
      setCurrentChapter(chapter);
      // Reset the video to start
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
      }
    }
  };

  // Function to handle video end
  const handleVideoEnd = (index) => {
    setCompletedChaptersMap((prevMap) => {
      const updatedMap = { ...prevMap };
      // Initialize the array if it doesn't exist
      if (!updatedMap[selectedCourse.id]) {
        updatedMap[selectedCourse.id] = [];
      }
      // Add the completed chapter index
      updatedMap[selectedCourse.id].push(index);
      return updatedMap;
    });
  };

  // Function to handle video pause
  const handlePause = () => {
    const currentTime = videoRef.current.currentTime;
    setPausedTimes((prevTimes) => ({
      ...prevTimes,
      [`${selectedCourse.id}-${currentChapter.name}`]: currentTime,
    }));
  };

  // Effect to handle video playback
  useEffect(() => {
    if (currentChapter && videoRef.current) {
      const pausedTime = pausedTimes[`${selectedCourse.id}-${currentChapter.name}`];
      if (pausedTime) {
        videoRef.current.currentTime = pausedTime;
      }
    }
  }, [currentChapter, selectedCourse.id, pausedTimes]);

  // Context for dark mode
  const { darkMode } = useContext(MainContext);

  return (
    <div className={css.course_viewer} id={!darkMode && css.lightMode}>
      {/* Sidebar */}
      <div className={css.sidebar}>
      <h3>Courses</h3>
        <ul>
          {CourseList.map(course => (
            <li 
              key={course.id} 
              onClick={() => {
                setSelectedCourse(course);
                setCurrentChapter(null);
              }}
            >
              {course.name}
            </li>
          ))}
        </ul>
      </div>
      {/* Main content */}
      <div className={css.content}>
        {/* Video section */}
        <div className={css.video_section}>
          {currentChapter ? (
            <>
              <h2>{currentChapter.name}</h2>
              <video 
                ref={videoRef}
                src={currentChapter.url} 
                controls 
                onEnded={() => handleVideoEnd(selectedCourse.chapter.indexOf(currentChapter))}
                onPause={handlePause} 
              />
              <p>{selectedCourse.description}</p>
            </>
          ) : (
            <h2>Select a chapter to view</h2>
          )}
        </div>
        {/* Chapters section */}
        <div className={css.chapters_section}>
          <h3>Chapters</h3>
          <ul>
            {selectedCourse.chapter.map((chapter, index) => (
              <li 
                key={index} 
                className={completedChaptersMap[selectedCourse.id]?.includes(index) ? css.completed : ''} 
                onClick={() => handleChapterClick(chapter, index)}
              >
                {chapter.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CourseVideo;
