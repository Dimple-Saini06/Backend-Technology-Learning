const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
// const methodOverride = require("method-override");
const ExpressError = require("./ExpressError.js");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended : true}));
// app.use(methodOverride("_method"));


main()
.then(()=>{
    console.log("connection successfull!!!");
}).catch((e)=>{
    console.log(e);
});

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/fakewhatsapp');
}


const port = 8080;

function asyncWrap(fn){
    return function(req, res, next){
        fn(req, res, next).catch(err => next(err));
    }
}
app.get("/chats", asyncWrap(async (req, res)=>{
    // try{
        let chats = await Chat.find();
        res.render("index.ejs", { chats });     
    // }catch(err){
    //     next(err);
    // }
    
}));

app.get("/chats/new", (req, res)=>{
    // throw new ExpressError(404, "page not found");
    res.render("newChat.ejs");
});

app.post("/chats", asyncWrap(async(req, res, next)=>{
    // try{
        let {from, msg, to} =  req.body;
        let newChat = new Chat({
            from : from,
            to : to,
            msg : msg,
            created_at : new Date()
        });

        await newChat.save();
        res.redirect("/chats");
    // } catch(err){
    //     next(err);
    // }
}));

//NEW - SHOW ROUTE
app.get("/chats/:id", asyncWrap(async(req,res,next)=>{
    // try{
        let { id } = req.params;
        let chat = await Chat.findById(id);
        if(!chat){
            throw new ExpressError(404, "Chat not found");
        }
        res.render("edit.ejs", {chat});
    // }catch(err){
    //     next(err);
    // }
    
}));

//Edit route
app.get("/chats/:id/edit", asyncWrap(async(req, res)=>{
    // try{
        let {id} = req.params;
        let chat = await Chat.findById(id);
        res.render("edit.ejs", { chat });
    // }catch(err){
    //     next(err);
    // }
    
}));


app.put("/chats/:id", asyncWrap(async(req, res)=>{
    // try{
        let {id} = req.params;
        let { msg: newMsg} = req.body;
        console.log(newMsg);
        let updatedChat = await Chat.findByIdAndUpdate(id, 
            { msg : newMsg }, 
            {runValidators : true, new : true}
        );

        console.log(updatedChat);
        res.redirect("/chats");
    // }catch(err){
    //     next(err);
    // }
    
}));



//delete route
app.delete("/chats/:id", asyncWrap(async(req,res)=>{
    // try{
        let {id} = req.params;
        let deletedChat = await Chat.findByIdAndDelete(id);
        console.log(deletedChat);
        res.redirect("/chats");
    // }catch(err){
    //     next(err);
    // }
    
}));
    


app.get('/', (req, res)=>{
    res.send("home call!!");
});

const handleValidateError = (err) =>{
    console.log("This was a vlaidation error. please follow rules..");
    console.log(err.message);
    return err;
}

app.use((err, req, res, next) => {
    console.log(err.name);
    if(err.name == "ValidationError"){
        err = handleValidateError(err);
    }

    next(err);
})
app.use((err, req, res, next)=>{
    let {status = 500, message = "some error occur"} =  err;
    res.status(status).send(message);
})

app.listen(port, ()=>{
    console.log(`listening ${port}`);
});