const mongoose = require('mongoose');
const{Schema}=mongoose;

main()
.then(()=>{
    console.log("connected successfully");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/otf');
}

const userSchema=new Schema({
    name:String,
    // address ke andr dusra collection define hua hai..this is called embedding
    // id false set krne se id genrate nhi hota h....thus sirf user ka id se sb kaam ho jaega
    address:[{
        _id:false,
        location:String,
        city:String
    }],

});

const User=mongoose.model("User" , userSchema);

const usergen=async ()=>{
    const user1=new User({
        name:"Rahul",
        address:[{
            location:"Bihar",
            city:"Patna",
        }]
    });
    user1.address.push({location:"Odisha" , city:"BBSR"});
    let res= await user1.save();
    console.log(res);

}
usergen();

// const deluser=async ()=>{
//     await User.deleteMany({});}
// deluser();