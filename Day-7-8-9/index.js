const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "./public/CSS")));
app.use(express.static(path.join(__dirname, "./public/JS")))


/*app.get('/', (req,res)=>{
    res.send("<h1>home click</h1>");
})


app.get('/Apple', (req,res)=>{
    res.send("<h1>search click</h1>");
})

app.get('*any', (req,res)=>{
    res.send("<h1>any click</h1>");
})*/


/*app.use((req,res)=>{
    console.log(req);
    res.send("<h1>hello world</h1>");
});*/


app.set("view engine", "ejs");

app.get('/', (req, res)=>{
    // res.send("home.ejs isgood ");

    res.render("home.ejs"); 
});

app.get('/rollDice', (req, res)=>{
    let diceVal = Math.floor(Math.random() * 6) + 1;
    res.render("rollDice.ejs", { diceVal});
})

app.get('/ig/:username', (req, res)=>{
    let {username} = req.params;
    // let followers = ["adam", "bob", "suraj", "shree Jii"];
    // console.log("port : ", {username});
    // res.render("instagram.ejs", {username, followers});


    const instaData = require('./data.json');
    const data = instaData[username];
    if(data){
        res.render('instagram.ejs', {data});
    }else{
        res.render('error.ejs');
    }
   console.log(data); 


   
})
app.listen(port, ()=>{
    console.log("server created.");
});