const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const ejs = require('ejs');
const postModel = require('./models/postmodel');
const bcrypt = require("bcrypt");
const userModel = require('./models/usermodel');
const jwt = require("jsonwebtoken");
const connectDB= require('./db/db');
const cookieParser = require("cookie-parser");
const usermodel = require("./models/usermodel");
connectDB();
app.set('view engine',"ejs");
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.json());
app.get('/',(req,res)=>{
    res.render("index");
})
app.post('/register',async(req,res)=>
    {
    let{email,password,username,age,name}=req.body;
    let user = await userModel.findOne({email});
if(user)
{
   return res.status(404).json({message:"User already exists"});
}
else
{
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(password,salt,async(err,hash)=>{
  let createduser = await  userModel.create({
        username,
        name,
        age,
        email,
        password:hash
    });
    let token = jwt.sign({email:email,userid:createduser._id},"shhh");
    res.cookie("token",token);
    res.redirect("/profile");
})
});
    }
});
app.get('/login',(req,res)=>{
res.render('login');
})
app.get('/profile',isLoggedIn,async(req,res)=>{
    let user = await userModel.findOne({email:req.user.email}).populate("post");
    
res.render("profile",{user});
})
app.get('/like/:id',isLoggedIn,async(req,res)=>{
    let post = await postModel.findOne({_id:req.params.id}).populate("user");
if(post.likes.indexOf(req.user.userid)===-1)
{
    post.likes.push(req.user.userid);
}
else
{
post.likes.splice(post.likes.indexOf(req.user.userid),1);
}
await post.save();
res.redirect("/profile");
})
app.get('/edit/:id',isLoggedIn,async(req,res)=>{
    let post = await postModel.findOne({_id:req.params.id}).populate("user");
res.render("edit",{post});
})
app.get('/delete/:id',isLoggedIn,async(req,res)=>{
    let post = await postModel.findOneAndDelete({_id:req.params.id});
res.redirect('/profile');
})
app.post('/post',isLoggedIn,async(req,res)=>{
let user = await userModel.findOne({email:req.user.email});
let {content} =req.body;
let post = await postModel.create({
    user:user._id,
    content:content
});
user.post.push(post._id);
await user.save();
res.redirect('profile');
})
app.post('/login',async(req,res)=>{
let{email,password} =req.body;
let user =await userModel.findOne({email});
if(!user)
{
    return res.status(500).json({message:"Something went wrong"});
}
bcrypt.compare(password,user.password,(err,result)=>{
    if(result)
    {
            let token = jwt.sign({email:email,userid:user._id},"shhh");
    res.cookie("token",token);
        res.status(200).redirect("profile");
    }
    else
        res.redirect('/login');
});
})
app.post('/update/:id',async(req,res)=>{
    let post = await postModel.findOneAndUpdate({_id:req.params.id},{content:req.body.content});
    res.redirect("/profile");
});
app.get('/logout',(req,res)=>{
    res.cookie("token","");
    res.redirect("login");
})
function isLoggedIn(req,res,next){
    if(req.cookies.token==="")
        res.redirect("login");
    else
    {
        let data = jwt.verify(req.cookies.token,"shhh");
        req.user = data;
         next();
    }
}
app.listen(process.env.PORT,()=>{
    console.log(`Application is running in ${process.env.PORT}`);
})