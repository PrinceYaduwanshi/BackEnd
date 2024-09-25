const mysql=require("mysql2");
const {faker}=require("@faker-js/faker");
const express = require("express");
const app=express();
const path=require("path");
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));
const{ v4: uuidv4 }=require("uuid");
const port=8000;

app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname , "/views"));

app.listen(port,()=>{
    console.log(`running on port ${port}`);
});

app.get("/" , (req,res)=>{
    let q="SELECT count(*) FROM user";
    try{
        connection.query(q,(err,result)=>{
            if(err)throw err;
            console.log(result[0]["count(*)"]);
            let count=result[0]["count(*)"];
            res.render("home.ejs" , {count});
        })
    }catch(err){
        console.log("SOME ERROR");
    }
    
})
// show route
app.get("/user" , (req,res)=>{
    let q=`SELECT * FROM user`;
    try{
    connection.query(q, (err,users)=>{
        if(err)throw err;
        // console.log(result);
        res.render("showuser.ejs" , {users});
    })
    }catch(err){
        console.log(err);
    }
});

// edit route
app.get("/user/:id/edit" , (req,res)=>{
    let {id} = req.params;
    let q=`SELECT * FROM user WHERE id="${id}"`;
    try{
        connection.query(q,(err,result)=>{
            if(err)throw err;
            console.log(result);
            let user=result[0];
            res.render("edit.ejs", {user});
        })
    }catch(err){
        console.log(err);
    }  
});
app.patch("/user/:id" , (req,res)=>{
    let {id} = req.params;
    let q=`SELECT * FROM user WHERE id="${id}"`;
    let{password:formPass , username:newUserName} = req.body;
    try{
        connection.query(q,(err,result)=>{
            if(err)throw err;
            console.log(result);
            let user=result[0];
            if(formPass != user.password){
                res.send("PASSWORD INCORRECT");
            }
            else{
                let q2=`UPDATE user SET username="${newUserName}" WHERE id="${id}"`;
                connection.query(q2 , (err,result)=>{
                    if(err){
                        throw err;
                    }
                    res.redirect("/user");
                });
            }
        })
    }catch(err){
        console.log(err);
    }  
});

// new user
app.get("/user/new" , (req,res)=>{
    res.render("newuser.ejs");
});
app.post("/user" , (req,res)=>{
    let{username,email,password}=req.body;
    let id=uuidv4();
    let q=`INSERT INTO user(id,username,email,password) VALUES ("${id}","${username}","${email}","${password}")`;
    try{
        connection.query(q,(err,result)=>{
            if(err){
                throw err;
            }
            res.redirect("/user");
        });
    }catch(err){
        console.log(err);
    }
})

// delete user
app.get("/user/:id/delete" , (req,res)=>{
    let {id}=req.params;
    let q=`SELECT * FROM user WHERE id="${id}" `;
    try{
        connection.query(q,(err,result)=>{
            if(err)throw err;
            let user=result[0];
            console.log(result);
            res.render("delete.ejs",{user});
        })
        }catch(err){
            console.log(err);
        }
    });
app.delete("/user/:id",(req,res)=>{
    let {id}=req.params;
    let{password}=req.body;
    let q=`SELECT * FROM user WHERE id="${id}" `;
    try{
        connection.query(q,(err,result)=>{
            if(err)throw err;
            let user=result[0];
            if(user.password != password){
                res.send("WRONG PASSOWRD");
            }else{
                let q2=`DELETE FROM user WHERE id="${id}" `;
                connection.query(q2,(err,result)=>{
                    if(err)throw err;
                    else{
                        res.redirect("/user");
                    }
                })
            }


        })
    }catch{
        console.log(err);
    }
})

let genUser= ()=>{
    return[
        faker.string.uuid(),
        faker.internet.userName(),
        faker.internet.email(),
        faker.internet.password()
    ];
};

const connection=mysql.createConnection({
    host:"localhost",
    user:"root",
    database:"app",
    password:"hellotomysql",
});


// let q="INSERT INTO user(id,username,email,password) VALUES ?";
// let info=[];

// for(let i=1 ; i<=100 ; i++){
//     info.push(genUser());
// }

// try{
//     connection.query(q,[info],(err,result)=>{
//         if(err){
//             throw err;
//         }
//         console.log(result);
//     })
// }catch(err){
//     console.log(err);
// };

// connection.end();