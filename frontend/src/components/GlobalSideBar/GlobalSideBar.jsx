import React, { useContext, useEffect, useState } from 'react'
import css from './GlobalSideBar.module.scss';
import { useNavigate } from 'react-router-dom';
import { MainContext } from '../../MainContext/MainContext';
// import MIB from '../../assets/sideBar/Mib.svg'
// import LMS from '../../assets/sideBar/Lms.svg'
import mobius from "../../logo/logo2.png";
import arrow from '../../assets/downArrow.svg'
import { sideBarItems } from './sideBarItems';

const GlobalSideBar = () => {
    const navigate = useNavigate()
    const { darkMode, navItem, setNavItem, setDarkMode, sprintProgressToolTip, setSprintProgressToolTip } = useContext(MainContext)
    const [currentDash, setCurrentDash] = useState('')

    useEffect(() => {
        const board = window.location.pathname.split("/")[1]
        setNavItem(board)
        const data = sideBarItems[board]
        setCurrentDash(data)
    }, [window.location.pathname.split("/")[1]])

    // console.log("value", sideBarItems);
    return (
        <div className={css.mainContainer} id={!darkMode && css.lightMode}>
            <div className={css.sidePanel}>
                <div className={css.header}>
                    <img src={mobius} alt="" />
                    <p>
                        MOBIUS
                    </p>
                </div>
                <div className={css.header}>
                    {/* <img src={mobius} alt="" /> */}
                    <p onClick={() => { navigate('mobiusIntelliBoard/operationalDashboard') }}>
                        operational dashboard
                    </p>
                </div>
                <div className={css.selectContainer}>
                    <div className={css.selectedItem}>
                        <img src={currentDash?.icon} alt="" />
                        <p>{currentDash?.name}</p>
                        <img id={css.arrow} src={arrow} alt="" />
                    </div>
                    {Object.keys(sideBarItems).map((key, keys) => {
                        const value = sideBarItems[key];
                        // console.log("value", value.name);
                        return (
                            <>
                                {<div key={keys}
                                    onClick={() => { navigate(value.path)}}
                                >
                                    <img src={value?.icon} alt="no image" />
                                    <p>{value?.name}</p>
                                </div>}
                            </>
                        );
                    })}
                    {/* <div>
                        <img src={currentDash?.icon} alt="" />
                        <p>{currentDash?.name}</p>
                        <img id={css.arrow} src={arrow} alt="" />
                    </div> */}

                    {/* {navItem !== "MobiusIntelliBoard" && <div onClick={() => { navigate('/mobiusIntelliBoard/summaryDashboard'), setNavItem("mib") }}>
                        <img src={MIB} alt="" />
                        <p>MobiusIntelliBoard</p>
                    </div>} */}
                    {/* {navItem !== "lms" && <div onClick={() => { navigate('/lms/Login'), setNavItem("lms") }}>
                        <img src={LMS} alt="" />
                        <p>LMS</p>
                    </div>} */}
                </div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>

            </div>
        </div>
    )
}

export default GlobalSideBar