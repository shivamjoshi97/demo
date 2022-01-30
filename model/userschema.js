const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        lname:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        phone:{
            type:Number,
            required:true
        },
        work:{
            type:String,
            required:true
        },
        address:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        cpassword:{
            type:String,
            required:true
        },
        date:{
            type:Date,
            default:Date.now
        },
        con1:{
            type:String,
            default:'India'
        },
        con2:{
            type:String,
            default:'Oman'
        },
        con3:{
            type:String,
            default:'Us'
        },
        rn1:{
            type:Number,
            default:Math.floor(Math.random() * 500) + 100,
        },
        rn2:{
            type:Number,
            default:Math.floor(Math.random() * 500) + 100,
        },
        rn3:{
            type:Number,
            default:Math.floor(Math.random() * 500) + 100
        },
        growth:{
            type:Number,
            required:true
        },
        loss:{
            type:Number,
            required:true
        },
        tokens:[
            {
                token:
                {
                    type:String,
                    required:true
                }
            }
        ]
    }
)
//we are hashing the password
userSchema.pre('save', async function(next)
{
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,12);
        this.cpassword = await bcrypt.hash(this.cpassword,12);
    }
    next();
});

//we are generating tokens
userSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id:this._id},process.env.SKEY);
        this.tokens=this.tokens.concat({token:token});
        await this.save();
        return token;
    }catch(err){
        console.log(err);
    }
}
//collection creation
const User = mongoose.model('USER',userSchema);
module.exports = User;
