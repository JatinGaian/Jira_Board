import React, { useContext, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Comment from "./Comment";
import LandingPage from "./LandingPage/LandingPage";
import Landing from "./Landing";
import BoardSummary from "./BoardSummary/BoardSummary";
import SummaryDashBoard from "./SummaryDashBoard/SummaryDashBoard";
import css from './App.module.scss'
import home from '../assets/home.svg'
import slash from '../assets/slash.svg'
import downArrow from '../assets/downArrow.svg'
import search from '../assets/search.svg'
import boardIcon from '../assets/board.svg'
import { SrdpContext } from "../Context/SrdpContext";



function App() {
  const [boardId, setBoardId] = useState("");
  const [boardName, setBoardName] = useState("");
  const [showSelect, setShowSelect] = useState(false)
  const [view, setView] = useState("landing");
  const [boardSearch, setBoardSearch] = useState("")
  const barColor = "#ff0000";

  const { breadCrumbs, setBreadCrumbs, activeBoards, setSelectedSprintFromSummary, setSelectedSprint } = useContext(SrdpContext)
  const navigate = useNavigate()


  return (

    <div className={css.mainContainer}>
      <div className={css.mainHeader} >
        <p onClick={() => navigate('/')}>Jira Boards</p>
      </div>
      {
        breadCrumbs?.home != null && (
          <div className={css.breadCrumbs}>
            <div className={css.container}>
              <span onClick={() => navigate('/')}
                style={{
                  cursor: 'pointer',
                  transition: 'background-color 0.3s', // Smooth transition effect
                }}
                onMouseEnter={(e) => { e.target.style.color = '#bb86fc'; }} // Change background color on hover
                onMouseLeave={(e) => { e.target.style.color = 'white'; }} // Restore original background color on hover out
              >
                <img src={home} alt="" />
                <p>Home</p>
              </span>
              {
                breadCrumbs.summaryBoard != null && (
                  <span onClick={() => navigate('/summaryDashboard')}
                    style={{
                      cursor: 'pointer',
                      transition: 'background-color 0.3s', // Smooth transition effect
                    }}
                    onMouseEnter={(e) => { e.target.style.color = '#bb86fc'; }} // Change background color on hover
                    onMouseLeave={(e) => { e.target.style.color = 'white'; }} // Restore original background color on hover out
                  >
                    <img src={slash} alt="" />
                    <p>{breadCrumbs?.summaryBoard}</p>
                  </span>
                )
              }
              {
                breadCrumbs.boardSummary != null && (
                  <div className={css.boardSelect}>
                    <span onClick={() => setShowSelect(!showSelect)}>
                      <img src={slash} alt="" />
                      <p style={{ color: `${showSelect ? "#bb86fc" : "white"}` }}>{breadCrumbs?.boardSummary}</p>
                      <img src={downArrow} alt="" />
                    </span>
                    <div className={`${css.selectContainer} ${!showSelect && css.hideSelect}`} >
                      <input type="text" placeholder="Search Boards.." value={boardSearch} onChange={(e) => setBoardSearch(e.target.value)} />
                      <img src={search} alt="" />
                      <p>{
                        `${activeBoards && activeBoards?.filter((board) =>
                          board.board_name.toLowerCase().startsWith(boardSearch.toLowerCase())
                        ).length}`}
                      </p>
                      <div className={css.list}>
                        {
                          activeBoards && activeBoards?.filter((board) =>
                            board.board_name.toLowerCase().startsWith(boardSearch.toLowerCase())
                          ).map((board, index) => (

                            <div
                              key={index}
                              // id={board.board_name === boardSearch ? css.selected : null}
                              onClick={() => {
                                console.log(board)
                                setBreadCrumbs({ ...breadCrumbs, boardSummary: board.board_name, sprint: board.sprints[0].sprint_name })
                                setSelectedSprintFromSummary(null)
                                setSelectedSprint(null)
                                navigate(`/BoardSummary/${board.board_id}/${board.board_name}`)
                                setShowSelect(false)
                              }}
                            >
                              <p>{`${board.board_name}`}</p>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  </div>
                )
              }
              {
                breadCrumbs.sprint != null && (
                  <span className={css.sprintBreadcrumb} >
                    <img src={slash} alt="" />
                    <p>{breadCrumbs?.sprint}</p>
                  </span>
                )
              }
            </div>
          </div>
        )
      }

      <div className={css.mainContent}>
        <Routes>
          <Route
            path="/"
            element={
              <LandingPage
                setBoardName={setBoardName}
                setBoardId={setBoardId}
                setView={setView}
              />
            }
          />
          {/* <Route
            path={`/dashboard/:boardId/:boardName`}
            element={
              <Dashboard
                setView={setView}
              />
            }
          /> */}
          <Route
            path={`/BoardSummary/:boardId/:boardName`}
            element={
              <BoardSummary
                setView={setView}
              />
            }
          />
          <Route
            path={`/summaryDashboard`}
            element={
              <SummaryDashBoard
                setView={setView}
              />
            }
          />
          <Route
            path={`/daily-status`}
            element={
              <Comment />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
