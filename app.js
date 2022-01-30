const dotenv = require('dotenv');
const express = require('express');
const app=express();
require('./db/conn');
dotenv.config({path:'./config.env'});
app.use(express.json());
app.use(require('./router/auth'));

const port = process.env.PORT || 5000;


//3
if(process.env.NODE_ENV == "production"){
    app.use(express.static("client/build"));
    const path= require("path");
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
}


app.listen(port,()=>
{
    console.log(`running in port number ${port}`);
});
