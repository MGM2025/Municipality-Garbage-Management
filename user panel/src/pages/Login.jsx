import { useState } from "react";
import React from "react";
import {Navigate, useNavigate} from 'react-router-dom';
// import NavBarComponent from "../components/NavBar/Component";
// import loginBg from "../assets/loginBG.png"
const backendURL = import.meta.env.VITE_BACKEND_URL

const LoginPage = () => {
    const [currTab, setCurrTab] = useState('login');
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [regHoldingNo, setRegHoldingNo] = useState('');
    const [regWardNo, setRegWardNo] = useState('');
    const [regFullName, setRegFullName] = useState('');
    const [regEmail, setRegEmail] = useState('');
    const [regPassword, setRegPassword] = useState('');
    const [formErr, setFormErr] = useState('');
    const navigate = useNavigate();

    const changeTabTo = (newTab) => {
        setCurrTab(newTab);
    }

    const handleLogIn = async (e) => {
        e.preventDefault();
        if ('' === loginEmail) {
            setFormErr("Enter your email!")
            return
        }
        // if (!/^[a-zA-Z][\w-]{2,14}$/.test(email)) {
        //     setEmailErr("Enter a valid email!")
        // }
        if ('' === loginPassword) {
            setFormErr('Please enter a password')
            return
        }
        // if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#!$])[A-Za-z\d@#!$]{8,}$/.test(password)) {
        //     setPasswordErr('Password must be at least 8 characters long, contain at least one letter, one number, and one special character (@, #, !, or $)');
        //     return;
        // }
        // if(email =='user' && password == '1234')
        // {
        //     setFormErr("")
        //     navigate('/dashboard')
            
        // }
        // else{
        //     setFormErr('invalid credentials!!')
        // }
        const response = await fetch(`${backendURL}/user/login`, {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({loginEmail, loginPassword})
        })
        const data = await response.json();
        if(response.ok){
            setFormErr('');
            localStorage.setItem("token",
                JSON.stringify(
                    {
                        id: data.user.id,
                        fullName: data.user.fullName,
                        holdingNo: data.user.holdingNo,
                        wardNo: data.user.wardNo,
                        email: data.user.email,
                        profilePic: data.user.profilePic,
                        isUser: data.user.isUser
                    })
                );
            navigate('/');
        }
        else {
            setFormErr(data.message);
        }
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        if('' === regHoldingNo) {
            setFormErr("Enter your holding no!")
            return
        }
        if('' === regWardNo) {
            setFormErr("Enter your ward no!")
            return
        }
        if('' === regFullName) {
            setFormErr("Enter your full name!")
            return
        }
        if ('' === regEmail) {
            setFormErr("Enter your email!")
            return
        }
        // if (!/^[a-zA-Z][\w-]{2,14}$/.test(email)) {
        //     setEmailErr("Enter a valid email!")
        // }
        if ('' === regPassword) {
            setFormErr('Please enter a password')
            return
        }
        // if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#!$])[A-Za-z\d@#!$]{8,}$/.test(password)) {
        //     setPasswordErr('Password must be at least 8 characters long, contain at least one letter, one number, and one special character (@, #, !, or $)');
        //     return;
        // }
        // if(email =='user' && password == '1234')
        // {
        //     setFormErr("")
        //     navigate('/dashboard')
            
        // }
        // else{
        //     setFormErr('invalid credentials!!')
        // }
        console.log("password : ", regPassword)
        const response = await fetch(`${backendURL}/user/register`, {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({regHoldingNo, regWardNo, regFullName, regEmail, regPassword})
        })
        const data = await response.json();
        if(response.ok){
            setFormErr('');
            localStorage.setItem("token",
                JSON.stringify(
                    {
                        id: data.user.id,
                        fullName: data.user.fullName,
                        holdingNo: data.user.holdingNo,
                        wardNo: data.user.wardNo,
                        email: data.user.email,
                        profilePic: data.user.profilePic,
                        isUser: data.user.isUser
                    })
                );
            navigate('/');
        }
        else {
            setFormErr(data.message);
        }
    }

    return (
        <>
            {/* <div className='fixed w-full top-0 z-10'>
                <NavBarComponent />
            </div> */}
            <div
                className="loginPageMain w-full px-5 py-3 text-[#14532d] flex justify-around items-center relative bg-gradient-to-tr from-[#86efac] to-green-700"
                style={{height: "calc(100vh)", 
                    // backgroundImage: `url(${loginBg})`, backgroundSize: "cover", backgroundPosition: "center"
                }}
            >
                <div className="wlcmMsgContainer flex flex-col gap-3 text-[#14532d]">
                    <p className="wlcmMsg text-6xl font-medium">Welcome to</p>
                    <div className="MGMMsg text-6xl font-light">
                        <p className="MGPara">Green Tracker</p>
                        <p className="text-2xl">Built for Residents, Powered by Responsibility</p>
                    </div>
                </div>
                <div
                    className="loginContainer px-5 py-8 rounded-lg flex flex-col items-center"
                    style={{background: "linear-gradient(135deg, rgba(245,252,245,0.6), rgba(255,255,255,0.6)", boxShadow: '2px 2px 7px 5px rgba(0,0,0,0.2)'}}
                >
                    <div className="text-xl bg-green-700 p-1 flex w-[80%] rounded-md mb-10 cursor-pointer">
                        <div
                            className={`p-1 w-1/2 rounded-sm text-center
                                        ${currTab == 'login' ? 'bg-green-100' : 'text-green-100'}`}
                            onClick={() => setCurrTab('login')}
                        >
                            LogIn
                        </div>
                        <div
                            className={`p-1 w-1/2 rounded-sm text-center
                                        ${currTab == 'register' ? 'bg-green-100' : 'text-green-100'}`}
                            onClick={() => setCurrTab('register')}
                        >
                            Register
                        </div>
                    </div>
                    {(currTab == 'login') && (
                        <form className="flex flex-col items-center"
                            onSubmit={handleLogIn}>
                            <div className="inputsContainer w-96 flex flex-col gap-3">
                                <div className="flex flex-col">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" id='email' name="email"
                                        className="px-3 py-2 bg-transparent border-b-[1px] border-[#14532d] outline-none"
                                        // className="px-3 py-2 rounded-md backdrop-blur-lg"
                                        // style={{backgroundColor: "rgba(255,255,255,0.4)"}}
                                        onChange={(e) => setLoginEmail(e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" id='password' name="password"
                                        className="px-3 py-2 bg-transparent border-b-[1px] border-[#14532d] outline-none"
                                        // className="px-3 py-2 rounded-md backdrop-blur-lg"
                                        // style={{backgroundColor: "rgba(255,255,255,0.4)"}}
                                        onChange={(e) => setLoginPassword(e.target.value)} />
                                </div>
                            </div>
                            {formErr != ''
                                ? <div className="mt-3 text-red-600">{formErr}</div>
                                : <></>
                            }
                            <div className="inline-block w-32 mt-7 py-2 text-lg font-medium text-white rounded-full text-center cursor-pointer bg-gradient-to-t from-green-700 to-[#159a46]">
                                <input type="submit" value={'LogIn'} />
                            </div>
                        </form>
                    )}
                    {(currTab == 'register') && (
                        <form className="flex flex-col items-center"
                            onSubmit={handleRegister}>
                            <div className="inputsContainer w-96 flex flex-col gap-3">
                                <div className="flex flex-col">
                                    <label htmlFor="holdingNo">Holding No.</label>
                                    <input type="text" id='holdingNo' name="holdingNo"
                                        className="px-3 py-2 bg-transparent border-b-[1px] border-[#14532d] outline-none"
                                        // className="px-3 py-2 rounded-md backdrop-blur-lg"
                                        // style={{backgroundColor: "rgba(255,255,255,0.4)"}}
                                        onChange={(e) => setRegHoldingNo(e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="wardNo">Ward No.</label>
                                    <input type="text" id='wardNo' name="wardNo"
                                        className="px-3 py-2 bg-transparent border-b-[1px] border-[#14532d] outline-none"
                                        // className="px-3 py-2 rounded-md backdrop-blur-lg"
                                        // style={{backgroundColor: "rgba(255,255,255,0.4)"}}
                                        onChange={(e) => setRegWardNo(e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="fullName">Full Name</label>
                                    <input type="text" id='fullName' name="fullName"
                                        className="px-3 py-2 bg-transparent border-b-[1px] border-[#14532d] outline-none"
                                        // className="px-3 py-2 rounded-md backdrop-blur-lg"
                                        // style={{backgroundColor: "rgba(255,255,255,0.4)"}}
                                        onChange={(e) => setRegFullName(e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" id='email' name="email"
                                        className="px-3 py-2 bg-transparent border-b-[1px] border-[#14532d] outline-none"
                                        // className="px-3 py-2 rounded-md backdrop-blur-lg"
                                        // style={{backgroundColor: "rgba(255,255,255,0.4)"}}
                                        onChange={(e) => setRegEmail(e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" id='password' name="password"
                                        className="px-3 py-2 bg-transparent border-b-[1px] border-[#14532d] outline-none"
                                        // className="px-3 py-2 rounded-md backdrop-blur-lg"
                                        // style={{backgroundColor: "rgba(255,255,255,0.4)"}}
                                        onChange={(e) => setRegPassword(e.target.value)} />
                                </div>
                            </div>
                            {formErr != ''
                                ? <div className="mt-3 text-red-600">{formErr}</div>
                                : <></>
                            }
                            <div className="inline-block w-32 mt-7 py-2 text-lg font-medium text-white rounded-full text-center cursor-pointer bg-gradient-to-t from-green-700 to-[#159a46]">
                                <input type="submit" value={'LogIn'} />
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </>
        
    )
}

export default LoginPage;