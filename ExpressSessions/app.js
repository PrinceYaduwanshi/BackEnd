const express=require("express");
const app=express();
const session = require("express-session");
const flash=require("connect-flash")
const path=require("path");
// const expressSessions=require("express-session");

const cond={
    secret:"secretcode",
    resave:false,
    saveUninitialized:true,
}

app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname,"views"));

app.use(session(cond));
app.use(flash());

app.get("/test",(req,res)=>{
    res.send("TEst success!!");
})

app.get("/register",(req,res)=>{
    let {name="random"}=req.query;
    console.log(req.session);
    req.flash("success","Registered Successfully");
    // new variables can be created in req.session object which can be accessed anywhere 
    req.session.name=name;
    res.redirect("/hello");
})

app.get("/hello",(req,res)=>{
    res.render("index.ejs",{ name:req.session.name,msg:req.flash("success")});
})

app.get("/request",(req,res)=>{
    if(req.session.count){
        req.session.count++;
    }else{
        req.session.count=1;
    }
    res.send(`You send a request ${req.session.count} times`);
})

app.listen(3000,()=>{
    console.log("Running on port 3000");
});

