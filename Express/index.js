const exp= require("express");
const app=exp();

let port=8080;

app.listen(port,()=>{
    console.log(`app is running on ${port}`);
});

// app.use((req,res)=>{
//     console.log("request recieved");
//     let code="<h1>WELCOME</h1>";
//     res.send(code);
// });

// app.get("/signup" ,(req,res)=>{
//     res.send("SignUp Page");
// });

// app.get("/help",(req,res)=>{
//     res.send("HELP");
// });

// app.get("/contact" , (req,res)=>{
//     res.send("Contact Details");
// })

// app.get("*",(req,res)=>{
//     res.send("route does not exist");
// });

app.get("/:username/:id",(req,res)=>{
    let {username,id}=req.params;
    res.send(`username is @${username}`);
})

app.get("/search",(req,res)=>{
    let {q}=req.query;
    res.send(`query is @ ${q}`);
})


