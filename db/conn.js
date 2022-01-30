const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});
const DB=process.env.DB;
mongoose.connect(DB,{
    useNewUrlParser:true,
})
mongoose.connection
    .once('open',()=> console.log('Connection Sucessfull'))
    .on('error',(error)=>{
        console.log("Connection Fial",error);
    });