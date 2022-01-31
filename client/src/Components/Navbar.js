import React,{useContext} from 'react'
import { NavLink } from 'react-router-dom';
import {UserContext} from "../App";
const Navbar = () => {

  const { state } = useContext(UserContext);

  const RenderList = () => {
      
    if (state) {
        return (
            <>
              <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
              <NavLink className="nav-link" to="/logout">Logout</NavLink>
            </>
        )
    }else {
      return (
          <>
            <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
            <NavLink className="nav-link" to="/signup">Register</NavLink>
            <NavLink className="nav-link" to="/login">Login</NavLink>
          </>
      )
  }
};

    return (
    <>
<nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor:"#d5d5d5"}}>
  <div className="container-fluid">
    <NavLink className="navbar-brand" to="#">Designed By Shivam Joshi</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav margin">
        <RenderList/>
      </div>
    </div>
  </div>
</nav>
    </>
    )
}

export default Navbar
