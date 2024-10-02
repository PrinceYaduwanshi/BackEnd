const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const Chat=require("./models/chat.js");
const methodOverride=require("method-override");


app.set("view engine","ejs");
app.set("views" , path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname , "public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

const port=8000;

app.listen(8000,()=>{
    console.log("app is listening on port 8000");
});

main()
.then(() => {
    console.log("connection success");
})
.catch((err) => {
    console.log(err);
});

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
};


// Index Route
app.get("/chats", async(req,res)=>{
    let chats=await Chat.find();
    res.render("index.ejs", {chats});
});


// New CHAT created and posted
// New Route
app.get("/chats/new" , (req,res)=>{
    res.render("new.ejs")
})
// Create Route
app.post("/chats" ,(req,res)=>{
    let{from,msg,to}=req.body;
    let newChat= new Chat({
        from:from,
        to:to,
        msg:msg,
        created_at:new Date(),
    });
    newChat.save()
        .then((res)=>{
            console.log("Chat was saved");
        })
        .catch((err)=>{
            console.log(err);
        })
    res.redirect("/chats");
});


// EDIT CHAT
// Edit Route
app.get("/chats/:id/edit" , async(req,res)=>{
    let{id}=req.params;
    let chat= await Chat.findById(id);
    res.render("edit.ejs",{chat});
});
// Update Route
app.put("/chats/:id" , async (req,res)=>{
    let {id}=req.params;
    // msg renamed to newMsg
    let {msg:newMsg}=req.body;
    let updatedChat= await Chat.findByIdAndUpdate(id,
        { msg : newMsg},
        {runValidators:true},
        {new:true},
    );
    res.redirect("/chats");
});

// destroy route
app.delete("/chats/:id" , async(req,res)=>{
    let{id}=req.params;
    let deletedchat = await Chat.findByIdAndDelete(id);
    // res.json({ message: `Chat with ID ${id} deleted successfully` });
    res.redirect("/chats");
});