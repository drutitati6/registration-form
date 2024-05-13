var express = require("express");
var bodyParser=require("body-parser");
var mongoose=require("mongoose");

const app=express()

app.use(bodyParser.json())
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended:true
}))
mongoose.connect('mongodb+srv://codedipa:pygHqt8jjzo30M5s@druti.suehx0x.mongodb.net/?retryWrites=true&w=majority&appName=druti')
var db=mongoose.connection
db.on('error',()=> console.log("Error in Connecting to Database"))
db.once('open', () => console.log('Connected to Database'));

app.post("/sign_up",(req,res)=>{
    var name=req.body.name
    var age=req.body.age
    var email=req.body.email
    var phno=req.body.phno
    var  gender=req.body.gender
    var password=req.body.password

    var data={
        "name":name,
        "age":age,
        "email":email,
        "phno":phno,
        "gender":gender,
        "password":password
    }
   
    db.collection('Databases').insertOne(data,(err,collection)=> {
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfuly")
    })
return res.redirect('signup_succes.html')
})

app.get("/",(req,res)=>{
    res.set({
        "Access-Control-Allow-Origin":'*'
        
    })
    return res.redirect('index.html')
})
//.listen(8080);

//console.log("Listening on port  8080")

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
