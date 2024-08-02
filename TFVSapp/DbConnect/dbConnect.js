const mysql=require("mysql");

var mysqlConnection = mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'iacsd123',
    database:'tfvsapp',
    port:3306
})

mysqlConnection.connect((err)=>{
    if(!err){
        console.log("Connection Done!!")
    }else{
        console.log(err);
    }
})

module.exports=mysqlConnection;
