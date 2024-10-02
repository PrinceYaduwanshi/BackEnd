const express = require("express");
const app = express();
const path = require("path");


const port = 9000;

app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname , "/views"));

app.use(express.static("public"));
app.use(express.static(path.join(__dirname , "/public")));

app.get("/" , (req,res)=>{
    res.render("home.ejs");
});

app.get("/rolldice" , (req , res)=>{
    let diceVal = Math.floor(Math.random() * 6)+1;
    res.render("rolldice.ejs", {num:diceVal})
});

// insta ejs

app.get("/ig/:user" , (req,res)=>{
    let{user} = req.params;
    const dataInsta = require("./data.json"); //assuming data is coming from database
    const data=dataInsta[user];
    // console.log(data);
    if(data){
        res.render("insta.ejs",{data});
    }else{
        res.render("error.ejs");
    }
    

})

app.listen(port , ()=>{
    console.log(`Running on port ${port}`);
})



