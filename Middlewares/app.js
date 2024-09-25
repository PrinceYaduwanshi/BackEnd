const express=require("express");
const app=express();

app.listen(8000,()=>{
    console.log(`Listening to port 8000`);
});

app.use("/api",(req,res,next)=>{
    let {token}=req.query;
    if(token==="giveaccess"){
        next();
        // send the request to the next middleware or req function where request is incoming
    }
    res.send("ACCESS DENIED");
    
});

app.get("/api" , (req,res)=>{
    res.send("data");
})