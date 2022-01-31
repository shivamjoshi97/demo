import React, { useState } from 'react'
import { NavLink,useHistory} from 'react-router-dom'

const Signup = () => {

    const history = useHistory();
    const[user,setUser]=useState({
        name:"",lname:"",email:"",phone:"",work:"",address:"",password:"",cpassword:""
    });
    let name,value;
    const handleInputs=(e)=>
    {
        name=e.target.name;
        value=e.target.value;
        setUser({...user , [ name ] :value});
    }
    
    const save = async (e)=>{
        e.preventDefault();
        const{name,lname,email,phone,work,address,password,cpassword}=user;
        const res= await fetch("/register",
        {
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                name,lname,email,phone,work,address,password,cpassword
            })
        });
        const data = await res.json();
        if(data.error === "401")
        {
            window.alert("please fill the detail properly");

        }else if (data.error === "402") 
        {
            window.alert("Mail already registered");
        }
        else if (data.error === "403") {
            window.alert("Password And Confirm Password must be same");
        }
        else if (data.error === "404") {
            window.alert("UserName already registered");
        }
        else
        {
            window.alert("user registration successfull");
            history.push("/Login");
        }
    }
    return (
        <>
    <div className="page-wrapper bg-gra-02 p-t-10 p-b-100 font-poppins home-page2">
        <div className="wrapper wrapper--w680">
            <div className="card card-4">
                <div className="card-body">
                    <h2 className="title">Registration Form</h2>
                    <form method="POST">
                        <div className="row row-space">
                            <div className="col-2">
                                <div className="input-group">
                                    <input className="input--style-4" 
                                    type="text" name="name" id="name"
                                    value={user.name}
                                    onChange={handleInputs}
                                    placeholder="First Name"
                                    />
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="input-group">
                                    <input className="input--style-4" 
                                    type="text" name="lname" id="lname"
                                    value={user.lname}
                                    onChange={handleInputs}
                                    placeholder="Last Name"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row row-space">
                            <div className="col-2">
                                <div className="input-group">
                                    <input className="input--style-4" type="email" name="email" id="email" autoComplete="off"
                                    value={user.email}
                                    onChange={handleInputs}
                                    placeholder="Email"
                                    />
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="input-group">
                                    <input className="input--style-4" type="tel" name="phone" id="phone"
                                    value={user.phone}
                                    onChange={handleInputs}
                                    placeholder="Phone Number"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row row-space">
                            <div className="col-2">
                                <div className="input-group">
                                    <input className="input--style-4" type="text" name="work" id="work"
                                    value={user.work}
                                    onChange={handleInputs}
                                    placeholder="Profession"
                                    />
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="input-group">
                                    <input className="input--style-4" type="text" name="address" id="addrress"
                                    value={user.address}
                                    onChange={handleInputs}
                                    placeholder="Address"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row row-space">
                            <div className="col-2">
                            <div className="input-group">
                                    <input className="input--style-4" type="password" name="password" id="password"
                                    autoComplete="off"
                                    value={user.password}
                                    onChange={handleInputs}
                                    placeholder="Password"
                                    />
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="input-group">
                                    <input className="input--style-4" type="password" name="cpassword" id="cpassword"
                                    autoComplete="off"
                                    value={user.cpassword}
                                    onChange={handleInputs}
                                    placeholder="Confirm Password"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row row-space">
                        <div className="col-2">
                            <button className="btn btn--radius-2 btn--blue" type="submit" id="submit" name="submit" value="register"
                            onClick={save}
                            >Submit</button>
                        </div>
                        <div className="col-2">
                            <NavLink to="/Login" >I Am Already Registered</NavLink>
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

export default Signup