const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4 : uuidv4 } = require('uuid');
const methodOverride = require("method-override")

app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(methodOverride("_method"));

app.set("view engine", 'ejs');
app.set("views", path.join(__dirname , "/views"));

app.use(express.static(path.join(__dirname, "./public")));

let posts = [
    {
        id : uuidv4(),
        userName : 'apnaCollege',
        content : "i love coding!!"
    },
        {
        id : uuidv4(),
        userName : 'Dimple',
        content : "Never break the trust to anyone!"
    },
        {
        id : uuidv4(),
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
    let id =  uuidv4();         
    console.log(id);
    posts.push({id, userName, content});
    res.redirect("/posts");
    // res.send("post request received!!");
});

app.get("/posts/:id", (req,res)=>{
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);

    res.render("show.ejs", {post});
});

app.patch("/posts/:id", (req,res)=>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(newContent, post)
    res.redirect("/posts");
})

app.get("/posts/:id/edit", (req,res)=>{
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    console.log("edit open!!");
    res.render("edit.ejs", {post}); 
})


app.delete("/posts/:id/", (req,res)=>{
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
})

app.listen(port, ()=>{
    console.log(`listen to port ${port}. `);
});
