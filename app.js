const express = require("express");
const app = express();
const ExpressError = require("./ExpressError");

app.use((req, res, next)=>{
    console.log("first middleware!!");
    // res.send("middleware finish!!");
    next();
});


const check = (req, res, next) => {
    let { token } = req.query;
    if(token == "giveaccess"){
        return next();
    }

    throw new ExpressError(401, "Access Denied");
}

app.get("/api", check, (req, res)=>{
    res.send("data");
});



// app.use("/random", (req, res, next)=>{
//     console.log(req.method, req.hostname);
//     next(); 
// })
// app.get('/', (req,res)=>{
//     res.send("home request!!");
// });

// app.use((req,res) =>{
//     res.status(404).send("Page not found!!");
// });


app.get("/admin", (req,res)=>{
    throw new ExpressError(403, "Not Accessed");
});

app.get("/err", (req, res)=>{
    abcd = abcd;
});

app.use((err, req, res, next)=>{
    // console.log("--------ERROR---------");
    // next(err);
    // res.send(err);

    let { status=500, message="Some error occur" } = err;
    res.status(status).send(message);
});

app.listen(8080, ()=>{
    console.log("connection successfull!!");
});