const mongoose = require("mongoose");
main()
.then(()=>{
    console.log("connection success");
})
.catch((err)=>{
    console.log(err);
})
async function main(){
    await mongoose.connect( "mongodb://127.0.0.1:27017/test");
    // creates a db test
};

const bookSchema =mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    author:{
        type:String,
    },
    price:{
        type:Number,
        min:[1,"BOOK PRICE IS TOO LOW"],
    },
    category:{
        type:String,
        enum:["fiction","non-fiction"],
    }
});

const Book=mongoose.model("Book",bookSchema);
Book.findByIdAndUpdate("668abf73486db957ba2d5f55" , {price:-1},{runValidators:true})
.then((res)=>{
    console.log(res);
}).catch((err)=>{
    console.log(err.errors.price.properties.message);
});


// const book2=new Book({
//     title:"Marvel Comics v2",
//     author:"Marvel",
//     price:899,
//     category:"non-fiction",
// });
// book2.save();