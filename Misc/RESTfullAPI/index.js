const express = require("express");
const app=express();
const path =require("path");
const {v4:uuidv4}=require("uuid");
const methodOverride = require("method-override");


const port = 8000;

app.use(methodOverride("_method"));//for giving patch request

app.use(express.urlencoded({extended:true}));

app.set("view engine" , "views");
app.set("views" , path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

app.listen(port ,(req,res)=>{
    console.log(`SERVER RUNNING ON ${port}`);
});

// basic requirements ^^^
 
let posts=[
    {   
        id:uuidv4(),
        username:"Prince",
        content:"I am boscoite",
    },
    {
        id:uuidv4(),
        username:"Aditya",
        content:"I am from JH",
    },
    {
        id:uuidv4(),
        username:"Sahhil",
        content:"I am from BR",
    }

];

app.get("/posts" , (req,res)=>{
    res.render("home.ejs" ,{posts});
});


app.get("/posts/new" , (req,res)=>{
    res.render("new.ejs");
});//form submitted
app.post("/posts" , (req,res)=>{
    let {username , content}=req.body;
    let id=uuidv4();
    posts.push({id , username,content});
    res.redirect("/posts");
});//post added



app.get("/posts/:id" , (req,res)=>{
    let {id} = req.params;
    let post=posts.find((p) => id == p.id);
    res.render("show.ejs",{post});
})//showing post for specific detail




// updating content of post
app.patch("/posts/:id" , (req,res)=>{
    let{id}=req.params;
    let newContent = req.body.content;
    let post=posts.find((p) => id == p.id);
    post.content=newContent;
    res.redirect("/posts");
});
app.get("/posts/:id/edit" , (req,res)=>{
    let{id}=req.params;
    let post=posts.find((p) => id == p.id);
    res.render("edit.ejs",{post});
});



// deleting post same as patch 
app.delete("/posts/:id" , (req,res)=>{
    let{id}=req.params;
    posts=posts.filter((p) => id != p.id);
    res.redirect("/posts");
})