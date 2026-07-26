const express = require("express");
const app = express();
const port = 8080;
const path = require("path");

app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.set("view engine", 'ejs');
app.set("views", path.join(__dirname , "/views"));

app.use(express.static(path.join(__dirname, "./public")));

let posts = [
    {
        id : '1a',
        userName : 'apnaCollege',
        content : "i love coding!!"
    },
        {
        id : '2b',
        userName : 'Dimple',
        content : "Never break the trust to anyone!"
    },
        {
        id : '3c',
        userName : 'kushal',
        content : "He is best person."
    },
];

app.get("/posts", (req, res)=>{
    res.render("index.ejs", {posts});
});

app.get("/posts/new", (req, res)=>{
    res.render("new.ejs");
});

app.post("/posts", (req,res)=>{
    // console.log(req.body);
    let {userName, content} = req.body;
    posts.push({userName, content});
    res.redirect("/posts");
    // res.send("post request received!!");
});

app.get("/posts/:id", (req,res)=>{
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    // console.log(post);
    res.render("show.ejs", {post});
})

app.listen(port, ()=>{
    console.log(`listen to port ${port}. `);
});