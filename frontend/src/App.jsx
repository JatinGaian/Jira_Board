import React, { useContext, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import mobius from "./logo/logo2.png";
import css from './App.module.scss'
import home from '../src/assets/home.svg'
import slash from '../src/assets/slash.svg'
import downArrow from '../src/assets/downArrow.svg'
import search from '../src/assets/search.svg'
import boardIcon from '../src/assets/board.svg'
import { SrdpContext } from "../src/components/MobiusIntelliBoard/Context/SrdpContext";
import Alerts from "../src/components/MobiusIntelliBoard/Alerts/Alerts";
import NewSummaryDashboard from "../src/components/MobiusIntelliBoard/NewSummaryDashboard/NewSummaryDashboard";
import MobiusIntelliBoard from "../src/components/MobiusIntelliBoard/MobiusIntelliBoard";
import BoardSummary from "../src/components/MobiusIntelliBoard/BoardSummary/BoardSummary";
import Login from "./components/MobiusIntelliBoard/Login/Login";
import { MainContext } from "./MainContext/MainContext";
import LMS from "./components/LMS/LMS";
import Courses from "./components/LMS/Courses/Courses";
import LoginPage from "./components/LMS/LoginPage/LoginPage";
import { Toaster } from "react-hot-toast";
import CourseVideo from "./components/LMS/Courses/CourseVideo/CourseVideo";
import GlobalSideBar from "./components/GlobalSideBar/GlobalSideBar";
import employees from "./Employees";
import AdminPage from "./components/MobiusIntelliBoard/DummyLandingPage/AdminPage";
import DeveloperPage from "./components/MobiusIntelliBoard/DummyLandingPage/DeveloperPage";
import OperationalDashboard from "./components/MobiusIntelliBoard/OperationalDashboard/OperationalDashboard";
import SprintView from "./components/MobiusIntelliBoard/SprintView/SprintView";
// import lead from '../src/assets/lead2.png'
// import Allboards from "./Allboards/Allbards";
// import TOploader from 'react-top-loading-bar'


function App() {
  const [boardId, setBoardId] = useState("");
  const [boardName, setBoardName] = useState("");
  const [view, setView] = useState("landing");
  const { darkMode, setDarkMode, sprintProgressToolTip, setSprintProgressToolTip } = useContext(MainContext)
  // console.log(employees, "employees")
  // const exEmployees = employees.filter(emp => emp["Employee Status"] === "Inactive")
  // console.log(exEmployees, "exEmployees")

  const navigate = useNavigate()
  useEffect(() => {
    const path = window.location.pathname
    // console.log(path)
    if (path == "/") navigate('/mobiusIntelliBoard/summaryDashboard');
  }, [])


  return (
    <div className={css.mainContainer} id={!darkMode && css.lightMode}
      onClick={(event) => {
        if (sprintProgressToolTip == true) {
          setSprintProgressToolTip(false)
        }
      }}
    >
      {/* <Alerts /> */}
      <Toaster position="top-center"
        reverseOrder={false}
      />
      {/* <div className={css.mainHeader} >
        <p onClick={() => navigate('/')}>carousal</p>
        <p onClick={() => navigate('/mobiusIntelliBoard/login')}>Login</p>
        <img src={mobius} onClick={() => { navigate(`/mobiusIntelliBoard/summaryDashboard`) }} />
        <p onClick={() => navigate('/mobiusIntelliBoard/summaryDashboard')}>Mobius IntelliBoard</p>
        <button onClick={()=> setDarkMode(!darkMode)}>theme</button>
        <div className={css.themeChanger} >
          <label className={css.switch}>
            <input type="checkbox" onClick={() => setDarkMode(!darkMode)} />
            <span className={css.slider}></span>
          </label>
        </div>
      </div> */}
      <div className={`${css.mainContent}`}>
        <div className={css.sideBar}>
          {/* <GlobalSideBar/> */}
        </div>
        <div className={css.content}>
          {/* <Routes>
              <Route
                path="/"
                element={
                  // <LandingPage
                  //   setBoardName={setBoardName}
                  //   setBoardId={setBoardId}
                  //   setView={setView}
                  // />
                  <NewSummaryDashboard
                    setView={setView}
                  />
                }
              />
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
                  <NewSummaryDashboard
                    setView={setView}
                  />
                }
              />
              <Route
                path={`/oldSummaryDashboard`}
                element={
                  <SummaryDashBoard />
                }
              />
            </Routes> */}
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="/" element={<MobiusIntelliBoard />} />
            <Route path="/mobiusIntelliBoard" element={<MobiusIntelliBoard />}>
              {/* <Route path="adminPage" element={<AdminPage />} /> */}
              <Route path="operationalDashboard" element={<OperationalDashboard />} />
              <Route path="sprintView/:boardId/:boardName/:sprintId" element={<SprintView />} />
              {/* <Route path="developerPage" element={<DeveloperPage />} /> */}
              <Route path="summaryDashboard" element={<NewSummaryDashboard />} />
              <Route path={`BoardSummary/:boardId/:boardName`} element={<BoardSummary />} />
            </Route>

            <Route path="/lms" element={<LMS />}>
              <Route path=":EmployeeID/courses" element={<Courses />} />
              <Route path="Login" element={<LoginPage />} />
              <Route path="coursesvideolist" element={<CourseVideo />} />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
