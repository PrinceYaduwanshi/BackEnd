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

let orderSchema=new Schema({
    item:String,
    price:Number
});

const Order=mongoose.model("Order" , orderSchema);
// let ordergen=async()=>{
//     let res=await Order.insertMany(
//        {item:"CHIPS" , price:10},
//        {item:"Chocolate" , price:20},
//     )
//     console.log(res);
// }
// ordergen();

let customerSchema=new Schema({
    name:String,
    ordered:[{
        type:Schema.Types.ObjectId,
        ref:"Order",
    }],
});

const Customer=mongoose.model("Customer" , customerSchema);

const addCust = async ()=>{
    let cust1=await new Customer({
        name:"Nikhli",
    });

    let newOrder=new Order({
        item:"Pizza",
        price:200,
    })

    cust1.ordered.push(newOrder);
    await cust1.save();
    await newOrder.save();
    console.log("DATA ADDED");
}

addCust();




//     let order1=await Order.findOne({item:"Chocolate"});
//     user1.ordered.push(order1);
//     let res=await user1.save();
//     console.log(res);
// }

// usergen();

// const finduser=async()=>{
//     let res = await User.find({}).populate("Order");
//     console.log(res);
// }
// finduser();
// const deluser=async ()=>{
//     await User.deleteMany({name:"Nihkil"});
// }
// deluser();