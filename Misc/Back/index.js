const exp= require("express");
const app = exp();

app.use(exp.urlencoded({extended:true}));
app.use(exp.json());

const port=8000;

app.listen(port,()=>{
    console.log(`server running on ${port}`);
});

app.get("/register" ,(req,res)=>{
    let{user , pass} = req.query;
    res.send(`standard GET response.. WELCOME ${user}`);
});

app.post("/register" , (req,res)=>{
    let{user , pass} = req.body;
    res.send(`standard POST response.. WELCOME ${user}`);
});