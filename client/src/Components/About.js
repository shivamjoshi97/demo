import React, { useEffect,useState } from 'react'
import {useHistory} from "react-router-dom"
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { PieChart, Pie} from 'recharts';

const About = () => {
    const[userData,setUserdata]=useState({});
    const history = useHistory();
    useEffect(()=>{
        const callAbout= async()=>{
            try{
            const res = await fetch('/about',{
                method:"GET",
                headers:{
                    Accept:"application/json",
                    "Content-Type":"application/json"
                },
                credentials:"include"
            })
            const data = await res.json();
            setUserdata(data);
            if(!res.status===200){
                const error = new Error(res.error);
                throw error;
            }
        }catch(err)
        {
            console.log(err);
            history.push('/Login');
        }
        };
        callAbout()
    },[]) // eslint-disable-line react-hooks/exhaustive-deps

    var d1=userData.rn1;
    var d2=userData.rn2;
    var d3=userData.rn3;
    var loss=Math.floor(Math.random() * 100) + 1;
    var growth=Math.floor(Math.random() * 100) + 1;
const pdata = [
    {name:`${userData.con1}` ,data: `${userData.rn1}`},
    {name:`${userData.con2}`, data: `${userData.rn2}` },
    {name:`${userData.con3}`, data: `${userData.rn3}`}];
const data01 = [
      { name: `${userData.con1}`, value: d1 },
      { name: `${userData.con1}`, value: d2 },
      { name: `${userData.con1}`, value: d3 }
    ];    
    return (
        <>
            <div className='row'>
                <div className='col-lg-6'>
                    <BarChart data={pdata} height={300} width={600}>
                    <XAxis dataKey="name" stroke="#8884d8" />
                    <YAxis />
                    <Tooltip wrapperStyle={{ width: 100, backgroundColor: "#ccc" }} />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <Bar dataKey="data" fill="#8884d8" barSize={30} />
                    </BarChart>
                    <h3 className='growth'>Growth</h3>
                    <h1 className='ig'>{growth}%</h1>
                </div>
                <div className='col-lg-6 '>
                <PieChart width={300} height={300} style={{left:"172px"}}>
                <Pie
                    dataKey="value"
                    isAnimationActive={false}
                    data={data01}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                />
                <Tooltip />
                </PieChart>
                <h3 className='loss'>Loss</h3>
                <h1 className='il'>{loss}%</h1>
                </div>
            </div>
         </>    

    )
}

export default About;