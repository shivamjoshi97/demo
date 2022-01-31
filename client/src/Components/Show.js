import React, { useEffect, useState } from 'react';
import { Table} from 'react-bootstrap';
import { useHistory} from 'react-router-dom'
import axios from 'axios';
const Show = () => {
  const history = useHistory();
    const [data, setData] = useState([]);
    const show= async()=>{
        try{
        const res = await fetch('/data',{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            },
        })
        const data = await res.json();
        setData(data);
    }catch(err)
    {
        console.log(err);
    }
    }
        //update
        const [isPut,setIsPut]=useState(false);
        const [newItem,setNewItem]=useState({
          name:"",
          lname:"",
          email:"",
          phone:"",
          work:"",
          address:"",
          password:"",
          cpassword:"",
          id:""
        });
    
    useEffect(()=>{
        show();
    },[newItem]);
//delete
    const deleteuser =async(id)=>{
       await axios.delete(`delete/${id}`);
       alert("Item deleted");
       show();
    }
    const openUpdate=async(id)=>
    {
      try{
        const res = await fetch(`/getdata/${id}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            },
        })
        const data = await res.json();
        setNewItem({...newItem,name:data.name,lname:data.lname,email:data.email,phone:data.phone,
          address:data.address,work:data.work,password:data.password,
          cpassword:data.cpassword
      });
    }catch(err)
    {
        console.log(err);
    }
      setIsPut(true);
      setNewItem(pre=>{
        return(
          {
            ...pre,
            id:id,
          }
        )
      })
    }
//update
    function updateItem(id)
    {
      axios.put(`update/${id}`,newItem);
      alert("Item Updated Sucessfully");
      history.push("/users");
    }
    //cancel
    function cancel()
    {
      history.push("/users");
    }
    function handleUpdate(event)
    {
      const {name,value}=event.target;
      setNewItem(pre=>
        {
          return(
            {
              ...pre,
              [name]:value
            }
          );
        });
        console.log(newItem);
    }
  return (
    <>
    <Table striped bordered hover border="2">
    <thead>
        <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Profession</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th style={{width:"220px"}}>Actions</th>
        </tr>
    </thead>
    <tbody>
      {
        data.map(users=>(
          <tr>
            <td>{users.name}</td>
            <td>{users.lname}</td>
            <td>{users.email}</td>
            <td>{users.work}</td>
            <td>{users.phone}</td>
            <td>{users.address}</td>
            <td>

                <button className="btn-primary" style={{marginRight:"10px"}} onClick={()=> openUpdate(users._id)} >Edit</button>
                <button className="btn-danger" onClick={()=> deleteuser(users._id)} >Delete</button>
            </td>
          </tr>
        ))
      }
    </tbody>
    </Table>
    <div>
      {!isPut?(
        <div></div>
      ):(
        <div className="page-wrapper bg-gra-02 p-t-10 p-b-100 font-poppins home-page2">
        <div className="wrapper wrapper--w680">
            <div className="card card-4">
                <div className="card-body">
                    <h2 className="title">Edit Data</h2>
                    <form method="PUT">
                        <div className="row row-space">
                            <div className="col-2">
                                <div className="input-group">
                                    <input className="input--style-4" 
                                    type="text" name="name" id="name" onChange={handleUpdate} value={newItem.name} 
                                    placeholder="First Name"/>
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="input-group">
                                    <input className="input--style-4" 
                                    type="text" name="lname" id="lname" onChange={handleUpdate} value={newItem.lname}                              
                                    placeholder="Last Name"/>
                                </div>
                            </div>
                        </div>
                        <div className="row row-space">
                            <div className="col-2">
                                <div className="input-group">
                                    <input className="input--style-4" type="email" name="email" id="email"
                                    autoComplete="off"                                placeholder="Email"
                                    onChange={handleUpdate} value={newItem.email}/>
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="input-group">
                                    <input className="input--style-4" type="tel" name="phone" id="phone"                                  
                                     placeholder="Phone Number" onChange={handleUpdate} value={newItem.phone}/>
                                </div>
                            </div>
                        </div>
                        <div className="row row-space">
                            <div className="col-2">
                                <div className="input-group">
                                    <input className="input--style-4" type="text" name="work" id="work"                                    placeholder="Profession"
                                    onChange={handleUpdate} value={newItem.work}/>
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="input-group">
                                    <input className="input--style-4" type="text" name="address" id="addrress"                                    placeholder="Address"
                                    onChange={handleUpdate} value={newItem.address}/>
                                </div>
                            </div>
                        </div>
                        <div className="row row-space">
                            <div className="col-2">
                            <div className="input-group">
                                    <input className="input--style-4" type="password" name="password" id="password"                                      autoComplete="off"
                                    placeholder="Password" disabled style={{cursor: "not-allowed"}}
                                    onChange={handleUpdate} value={newItem.password}/>
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="input-group">
                                    <input className="input--style-4" type="password" name="cpassword" id="cpassword" 
                                    autoComplete="off" style={{cursor: "not-allowed"}}
                                    placeholder="Confirm Password" disabled
                                    onChange={handleUpdate} value={newItem.cpassword}/>
                                </div>
                            </div>
                        </div>
                        <div className="row row-space">
                        <div className="col-2">
                            <button className="btn btn--radius-2 btn--blue" type="submit" id="submit" name="submit"
                            onClick={()=>updateItem(newItem.id)}
                            >Edit Data</button>
                        </div>
                        <div className="col-2">
                        <button className="btn btn--radius-2 btn--blue" type="submit" onClick={cancel()}
                            >Cancel</button>
                        </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
      )}
    </div>
    </>
  );

}

export default Show;