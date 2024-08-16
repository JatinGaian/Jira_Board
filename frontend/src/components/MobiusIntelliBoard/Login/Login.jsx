import React, { useContext } from 'react'
import { useGoogleLogin, googleLogout } from '@react-oauth/google'
import css from './Login.module.scss'
import axios from 'axios'
import LoginIllustration from '../../../assets/MIB/LoginIllustration.svg'
import googleLogo from '../../../assets/google_logo.svg'
import { useNavigate } from 'react-router-dom'
import { MainContext } from '../../../MainContext/MainContext'
const live_base_url = import.meta.env.VITE_live_base_url;

const Login = () => {
    const navigate = useNavigate()
    const { setLoggedInUser } = useContext(MainContext)
    const gmail = [
        "baliga.m@mobiusdtaas.ai",

    ]
    const login = useGoogleLogin({
        onSuccess: async (response) => {
            try {
                const res = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo',

                    {
                        headers: {
                            Authorization: `Bearer ${response.access_token}`
                        }
                    }
                );
                if (res.status == 200) {
                    const checkDomain = res.data.email;
                    // only authorized email domain should gets logged in
                    if (checkDomain.endsWith("@mobiusdtaas.ai")) {
                        setLoggedInUser(res?.data)
                        sessionStorage.setItem('user', JSON.stringify(res?.data));
                        navigate('/mobiusIntelliBoard/operationalDashboard')
                    } else {
                        window.Error("Login failed: Unauthorized email domain");
                        return
                    }
                   
                }
                // const result = await res.json()
                // console.log(res, "userData")
                const role = res.data.email == "baliga.m@mobiusdtaas.ai" ? "admin" : res.data.email == "kotaru.c@mobiusdtaas.ai" ? "superAdmin" : "user"
                const data = {
                    name: res.data.name,
                    email: res.data.email,
                    profileImage: res.data.picture,
                    role: role
                }
                const registerUser = await axios.post(`${live_base_url}/registration`,
                    data
                )
                console.log(registerUser.data)
            } catch (error) {
                console.log(error)
            }
        }
    })
    return (
        <div className={css.mainContainer}>
            <div className={css.left}>
                <p>Welcome to</p>
                <p>Mobius Intelli Board</p>
                <p>Sign in to access powerful analytics and real-time</p>
                <p>insights for your projects</p>
                <button
                    onClick={() => login()}
                >
                    <img src={googleLogo} alt="" />
                    Sign in with Google
                </button>
            </div>
            <div className={css.right}>
                <img src={LoginIllustration} alt="" />
            </div>
        </div>
    )
}

export default Login