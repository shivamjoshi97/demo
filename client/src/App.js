import React,{useReducer,createContext} from 'react'
import './App.css';
import Navbar from './Components/Navbar';
import {Route,Switch} from "react-router-dom";
import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';
import About from './Components/About';
import Error from './Components/Error';
import Logout from './Components/Logout';
import { initialState, reducer } from "./reducer/UserReducer";

//1:contextAPI
export const UserContext = createContext();

const Routing=()=>{
  return(
    <Switch>
 <Route exact path="/">
   <Home/>
 </Route >
 <Route path="/About">
   <About/>
 </Route>
 <Route path="/Login">
   <Login/>
 </Route>
 <Route path="/Signup">
   <Signup/>
 </Route>
 <Route path="/Logout">
   <Logout/>
 </Route>
 <Route>
   <Error></Error>
 </Route>
 </Switch>
  )
}
function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <>
    <UserContext.Provider value={{state,dispatch}}>
     <Navbar/>
     <Routing/> 
     </UserContext.Provider>
    </>
  );
}

export default App;
