const express=require("express")
const myrouter=express.Router();
const connection=require("../DbConnect/dbConnect");

myrouter.get("/",function(req,res){
    res.render("mainform");
})

myrouter.post("/insert",function(req,res){
    connection.query("insert into vegetables values(?,?,?,?)",[req.body.name,req.body.type,req.body.quantity,req.body.price],function(err,result){
        if(err){
            res.status(500).send("Failed to insert!");
        }else{
            res.status(200).send("Vegetable added successfully")
        }
    })
})

myrouter.get("/display",function(req,res){
    connection.query("select * from vegetables",function(err,data,field){
        if(err){
            res.status(500).send("Data not found!")
        }else{
            res.render('displaytable',{vegetables:data})
        }
    })
})

myrouter.get("/delete/:name",function(req,res){
    connection.query("delete from vegetables where name=?",[req.params.name],function(err){
        if(err){
            res.status(500).send("Data not found! Deletion failed")
        }else{
            res.redirect("/display");
        }
    })
})

myrouter.get("/getupdateform/:name",function(req,res){
    connection.query("select * from vegetables where name=?",[req.params.name],function(err,result){
        if(result.length===0){
            res.status(500).send("Failed to update!");
        }else{
            res.render('updateform',{vegetable:result[0]});
        }
    })
})

myrouter.post("/update",function(req,res){
    connection.query("update vegetables set name=?,type=?,quantity=?,price=?",[req.body.name,req.body.type,req.body.quantity,req.body.price],function(err,result){
        if(err){
            res.status(500).send("Failed to update!");
        }else{
            res.redirect('/display');
        }
    })
})

module.exports=myrouter;



