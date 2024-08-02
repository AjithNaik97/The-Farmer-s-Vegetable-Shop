const express=require("express")
const app=express();
const routes=require("./Router/router");
const bodyparser=require("body-parser");
const path=require("path")

app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json());

app.set("views",path.join(__dirname,"views")) 
app.set("view engine","ejs");

app.use("/",routes);
app.listen(3000,function(){
    console.log("Server is started on port no 3000");
})

module.exports=app;