const express = require('express');
const User = require('../model/userschema');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");
const { response } = require('express');
router.use(cookieParser());
require('../db/conn');

//Registration Route
router.post('/register', async (req,res)=>{ 
const {name,lname,email,phone,work,address,password,cpassword}=req.body;
const profit=Math.floor(Math.random() * 100) + 1;
const loss= Math.floor(Math.random() * 100) + 1;
const profit=Math.floor(Math.random() * 100) + 1;
const d1= Math.floor(Math.random() * 100) + 1;
const d2=Math.floor(Math.random() * 100) + 1;
const d3= Math.floor(Math.random() * 100) + 1;
if(!name || !lname || !email || !phone || !work || !address ||  !password || !cpassword) { 
    return res.status(422).json({error:"401"});
}
try{
    const userExist = await User.findOne({email:email});
    const nameExist = await User.findOne({name:name});
    if(userExist){
        return res.status(422).json({error: "402"});
    }
    else if (password!=cpassword){
        res.status(422).json({error: "403"});
    }else if(nameExist){
        res.status(422).json({error: "404"});
    }
    else
    {
        const user1 =new User({name,lname,email,phone,work,address,password,cpassword,profit,loss,d1,d2,d3});
        await user1.save();
        res.status(201).json({message:"Registration Sucessfull"});
    }
    }
catch(err){
    console.log(err);
}  
    });

//Login route

router.post('/signin', async (req,res)=>{ 
    try{
    const {email,password}=req.body;

    if(!email || !password){
        return res.status(400).json({error:"400"});
    }

    const validuser = await User.findOne({email:email});

    if(validuser){
        const match = await bcrypt.compare(password,validuser.password);

        // generate token
        const token = await validuser.generateAuthToken();
        //read token
        res.cookie("jwtoken", token ,  {
            expires:new Date(Date.now() + 2589000000),
            httpOnly:true
        });
        if(!match){
            res.status(400).json({error:"401"});
        }else{
            res.json({error:"Login Sucessfull"});
        }
    }else{
        res.status(400).json({error:"402"});
    }
}catch(err){
        console.log(err);
    }
});

//Validation

const private =async (req, res, next)=>{
    try
    {
        const token = req.cookies.jwtoken;
        const valid = jwt.verify(token, process.env.SKEY);
        const rootUser = await User.findOne({_id:valid._id,"tokens.token" :token});
        if(!rootUser){
            console.log("not a valid user");
        }
        req.rootUser=rootUser;
        req.userId=rootUser._id;
        next();
    }
    catch(err)
    {
        res.status(401).send(`Unauthorised:No token Found`);
        console.log(err);
    }
}

//home page
router.get('/getdata',private,async (req, res) => {
    res.send(req.rootUser);
});

//about us page
router.get('/about',private, async (req,res)=>
{
    res.send(req.rootUser);
});

// get user data for contact us and home page 
router.get('/getdata/:id',async (req, res) => {
    try{
        const rootUser = await User.findOne({_id:req.params.id});
        res.json(rootUser);
    }
    catch(err)
    {
        console.log(err);
    }
});

//data
router.get('/data',async (req, res) => {
   try{
        const rootUser = await User.find();
        if(!rootUser){
            console.log("No Data Found");
        }
        res.json(rootUser);
    }
    catch(err)
    {
        res.status(401).send(`No Data Found`);
        console.log(err);
    }
});



//logout
router.get('/logout',(req,res)=>
{
    res.clearCookie('jwtoken',{path:'/'});
    res.status(200).send('User Logout');
});
module.exports = router; 
