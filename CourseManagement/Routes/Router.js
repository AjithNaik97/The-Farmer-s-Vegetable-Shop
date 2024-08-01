const express=require("express");
const myrouter=express.Router();
const connection=require('../DBConnect/dbConnect');

myrouter.get("/",function(req,res){
    res.render("loginPage");
})

myrouter.post("/login",function(req,res){
    connection.query("select * from users where email=? and password=?",[req.body.email,req.body.password],function(err,result,field){
        if(result.length===0){
            res.status(500).send("Invalid credentials!");
        }else{
            res.redirect("/courses");
        }
    })
})

myrouter.get("/getFormForAdd", function(req,res){
    res.render("addCourse");
})
myrouter.post("/add",function(req,res){
    connection.query("insert into courses values(?,?,?,?)",[req.body.id,req.body.name,req.body.fees,req.body.duration],function(err,result){
        if(err){
            res.status(500).send("Data not inserted !!!");
        }else{
            res.status(200).send("Data inserted successfully!!!")
        }
    })
})

myrouter.get("/courses",function(req,res){
    connection.query("select * from courses",function(err,data,field){
        if(err){
            res.status(500).send("Data not found!!");
        }else{
            res.render('allCourses',{courses:data});
        }
    })
})

myrouter.get("/courses/:id",function(req,res){
    connection.query("select * from courses where id=?",[req.params.id],function(err,result,field){
        if(err){
            res.status(500).send("Invalid ID!");
        }else{
            res.render('allCourses',{courses:result});
        }
    })
})

myrouter.get("/getUpdateForm/:id",function(req,res){
    connection.query("select * from courses where id=?",[req.params.id],function(err,result,field){
        if(err){
            res.status(500).send("Invalid ID!");
        }else{
            res.render('updateCourse',{course:result[0]});
        }
    })
})

myrouter.post("/update",function(req,res){
    connection.query("update courses set name=?,fees=?,duration=? where id=?",[req.body.name,req.body.fees,req.body.duration,req.body.id],function(err,result,field){
        if(err){
            res.status(500).send("Failed to update");
        }else{
            res.redirect("/courses");
        }
    })
})

myrouter.get("/delete/:id",function(req,res){
    connection.query("delete from courses where id=?",[req.params.id],function(err,result,field){
        if(err){
            res.status(500).send("Failed to delete!");
        }else{
            res.redirect("/courses");
        }
    })
})

module.exports=myrouter;