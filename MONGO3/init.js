const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main()
.then(()=>{
    console.log("connection successfull!!!");
}).catch((e)=>{
    console.log(e);
});

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/fakewhatsapp');
}

let allChats = [
    {
        from : "nisha",
        to : "sidhart",
        msg : "send me the photos.",
        created_at : new Date()
    },
    {
        from : "sonakshi",
        to : "priya",
        msg : "tell me what happen.",
        created_at : new Date()
    },
    {
        from : "dish",
        to : "shal",
        msg : "i dont know.",
        created_at : new Date()
    },
    {
        from : "suru",
        to : "silulu",
        msg : "fine bye!",
        created_at : new Date()
    },
]


Chat.insertMany(allChats);
