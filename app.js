const express = require("express");
const app = express();


app.use((req, res, next)=>{
    console.log("first middleware!!");
    // res.send("middleware finish!!");
    next();
});

app.use("/random", (req, res, next)=>{
    console.log(req.method, req.hostname);
    next(); 
})
app.get('/', (req,res)=>{
    res.send("home request!!");
});

app.use((req,res) =>{
    res.status(404).send("Page not found!!");
});

app.listen(8080, ()=>{
    console.log("connection successfull!!");
});