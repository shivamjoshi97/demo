import React, { useState,useContext } from 'react'
import { NavLink,useHistory} from 'react-router-dom'
import {UserContext} from "../App";
const Login = () => {

    const {dispatch} = useContext(UserContext);

    const history = useHistory();
    const[email,setEmail]=useState();
    const[password,setPassword]=useState();
    const enter=async (e)=>
    {
        e.preventDefault();
        const res= await fetch("/signin",{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                email,
                password
            })
        });
        const data = await res.json();
        console.log(data.error);
        if(data.error === "400")
        {
            window.alert("please fill the detail properly");

        }else if (data.error === "401") 
        {
            window.alert("Invalid Credentials");
        }else if (data.error === "402") {
            window.alert("Invalid Credentials");
        }else{
            dispatch({type:'USER',payload:true})
            window.alert("Login Sucessufll");
            history.push("/");
        }
    }
    return (
        <>
        <div className="page-wrapper bg-gra-02 p-t-130 p-b-100 font-poppins home-page2">
        <div className="wrapper wrapper--w680">
            <div className="card card-4">
                <div className="card-body">
                    <h2 className="title text-center">Login Form</h2>
                    <form method="POST">
                        <div className="row row-space">
                            <div className="col-2">
                                <div className="input-group">
                                    <input className="input--style-4" type="text" name="email" id="email" autoComplete="off" value={email}
                                    onChange={(e)=> setEmail(e.target.value)}
                                    placeholder="Email"/>
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="input-group">
                                    <input className="input--style-4" type="Password" name="password" id="password" autoComplete="off" value={password}
                                    onChange={(e)=> setPassword(e.target.value)}
                                    placeholder="Password"/>
                                </div>
                            </div>
                        </div>
                        <div className="row row-space">
                        <div className="col-2">
                            <button className="btn btn--radius-2 btn--blue" type="submit" id="login" name="login" value="login" onClick={enter}
                            >Login</button>
                        </div>
                        <div className="col-2">
                            <NavLink to="/Signup" >Not A Member Sign Up</NavLink>
                        </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </div>
        </>
    )
}

export default Login;