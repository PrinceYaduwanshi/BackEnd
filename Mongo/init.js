const mongoose=require("mongoose");
const Chat=require("./models/chat.js");

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

const allchats=[
    {
    from:"Prince",
    to:"Prem",
    msg:"send the details",
    created_at:new Date(),
    },
    {
        from:"Tony",
        to:"Jarvis",
        msg:"Hello Jarvis",
        created_at:new Date(),
    },
    {
        from:"Neha",
        to:"Priya",
        msg:"hello",
        created_at:new Date(),
    },
    {
        from:"Liya",
        to:"Hela",
        msg:"Whatsupp!!1",
        created_at:new Date(),
        },
];

Chat.insertMany(allchats);