const express = require("express");
const app = express();
const port = 8080;

app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.get("/request", (req,res)=>{
    let {user, password} = req.query;
    res.send(`standard GET request. Welcome ${user}`);
})

app.post("/request", (req,res)=>{
    let {user, password} = req.body;
    res.send(`standard POST request. welcome ${user}! your password is ${password}`);
})

app.listen(port, ()=>{
    console.log(`listenig to port ${port}`);
})