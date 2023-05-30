const express = require('express')
const app = express()
var bodyParser = require('body-parser')
var cors = require('cors')
var MongoClient = require('mongodb').MongoClient;
const session = require('express-session')
const cookieParser = require("cookie-parser");
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser());
const url="mongodb+srv://eashan:eashan1147@cluster0.s6symkm.mongodb.net/?retryWrites=true&w=majority"
const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
  secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
  saveUninitialized:false,
  cookie: { maxAge: oneDay ,secure: false },
  resave: false 
}));
var sess;
app.get('/', function (req, res) {
  console.log("You are in backend")
  res.send(" Hello")
})
app.use(bodyParser.json())
app.post('/data', async function (req, res) {
  var data=req.body.params
  const client = new MongoClient(url);
  await client.connect();
  console.log("connected");
  const db=client.db("test");
  const collection=db.collection("Complaint");
  const count = await collection.estimatedDocumentCount()+1;
  console.log(count)
  doc={
    "_id":count,
    "empid":data["empid"],
    "email":data["email"],
    "dept":data["dept"],
    "complaint":data["comp"],
    "response":"",
    "resolved":false,
  }
  const result=await collection.insertOne(doc)
  
})

app.get('/getdata/:email', async function(req,res){
  var email=req.params.email
  const client = new MongoClient(url);
  await client.connect();
  const db=client.db("test");
  const collection=db.collection("Complaint");
  const result=await collection.find({"email":email}).toArray()
  console.log(result)
  res.send(result)
  
})

app.get('/alldata', async function(req,res){
  const client = new MongoClient(url);
  await client.connect();
  const db=client.db("test");
  const collection=db.collection("Complaint");
  const result=await collection.find().toArray()
  
  res.send(result)
  
})

app.post('/alldata', async function(req,res){
  var id=req.body.params.id
  const client = new MongoClient(url);
  await client.connect();
  const db=client.db("test");
  const collection= db.collection("Complaint");
  const result=await collection.updateOne({"_id":id},{$set:{"resolved":true}})
  console.log(result)
  res.send(result)  
})

app.post('/respond', async function(req,res){
  var comment=req.body.params.response
  var id=req.body.params.id
  console.log(comment)
  const client = new MongoClient(url);
  await client.connect();
  const db=client.db("test");
  const collection= db.collection("Complaint");
  const result=await collection.updateOne({"_id":id},{$set:{"response":comment}})
  console.log(result)
  res.send(result)  
})

app.post('/login', async function(req,res){
  
  var username=req.body.username
  var password=req.body.password
  const client = new MongoClient(url);
  await client.connect();
  console.log("connected")
  const db=client.db("test");
  const collection= db.collection("Users");
  const result=await collection.findOne({"username":username,"password":password})
  if (result){
    req.session.username=result.username
    req.session.type=result.type
    req.session.empid=result.empid
    req.session.msg="Successfull Login";
    sess=req.session;
    console.log(sess)
    res.send(sess)  
  }
  else{
    req.session.msg="Incorrect Username Or Password";
    sess=req.session;
    res.send(sess) 
  }
  
  
})
app.listen(5000)
