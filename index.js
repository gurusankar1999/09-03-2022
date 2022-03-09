const express=require("express");
const mysql =require("mysql2");
const app=express();
const multer=require("multer");
const upload=multer();
const bodyparser=require("body-parser")

let port=3000;

app.use(express.json());

const db=mysql.createConnection({

    host:"localhost",
    user:"root", 
    password:"",
    database:"cars",
    port:3306,
});

db.connect((err)=>{
    if(err){
        console.log(err,"error");
    }
    else{
        console.log("database connected");
    }
});

   app.post("/add",upload.none(),(req,res)=>{
       let customer_name=req.body.customer_name;
       let car_name=req.body.car_name;
       let car_model=req.body.car_model;
       let price=req.body.price;
       let GST=req.body.GST;
       let qry= `INSERT INTO fourwheeler ( customer_name, car_name, car_model, price, GST) VALUES ('${customer_name}','${car_name}','${car_model}','${price}','${GST}')`;
       db.query(qry,(err,result)=>{
        
        if(err){
            console.log(err);
        }
        console.log(result);

        if(result.affectedRows>0){
            res.send({status:true,msg:"connected",data:result});
        }
        else{
            res.send({status:false,msg:"falied"})
        }
   });
   });

  
app.listen(port,()=>{
    console.log("the server is running");
});


