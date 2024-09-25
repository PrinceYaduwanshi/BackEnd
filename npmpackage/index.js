const figlet =require("figlet");

figlet("PrinceYaduwanshi",function(err,data){
    if(err){
        console.log("SOmething went wrong!!");
        console.dir(err);
        return ;
    }
    console.log(data);
});