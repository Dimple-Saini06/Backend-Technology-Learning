const express = require('express');
const app = express();   //express is a function

// console.dir(app);  //app is a obj

let port = 8080;

app.listen(port, ()=>{
    console.log(`app is listening on port ${port}.`);
})

/*app.use((req, res) => {
    console.log("request received!!");
    // res.send("<h1>Fruits</h1><ul><li>mango</li><li>orange</li></ul>");
    //res.send({
        // name : "parrot",
        // color : "green",
    // });

    res.send(['apple', 'banana']);
})*/


app.get('/', (req, res) => {
    res.send("you contact home page.");
});

app.get('/apple', (req, res) => {
    res.send("you contact apple page.");
})