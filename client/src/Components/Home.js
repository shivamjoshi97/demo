import React, {useState, useEffect} from 'react'
import About from './About';

const Home = () => {
    const [userName, setUserName] = useState({
        fname:"",lname:""
    });
    const [show, setShow] = useState(false);
    useEffect(()=>{
        const home= async()=>{
            try{
            const res = await fetch('/getdata',{
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                },
            })
            const data = await res.json();
            setUserName({fname:data.name,lname:data.lname});
            setShow(true);
        }catch(err)
        {
            console.log(err);
        }
        }
        home();
    },[])

    const RenderList = () => {
      
        if (show) {
            return (
                <>
                  <About></About>
                </>
            )
        }else {
          return (
              <>
                <h1>No data found Please Login</h1>
              </>
          )
      }
    };
    
    return (
        <>
            <div className="home-page">
                <div className="home-div">
                    <p className="pt-5">WELCOME</p>
                    <h1 style={{fontFamily: "serifs-serif",textTransform:"uppercase",fontSize:"30px",fontWeight:"bold"}}>{userName.fname} {userName.lname}</h1>
                </div>
            </div>
            <div>
                <RenderList/>
            </div>
        </>
    )
}

export default Home
