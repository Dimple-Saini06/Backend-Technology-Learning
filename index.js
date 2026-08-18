const mongoose = require('mongoose');

main()
.then(()=>{
    console.log("connection successfull!!!");
}).catch((e)=>{
    console.log(e);
});

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
}

const userSchema = new mongoose.Schema({
    name : String,
    email : String,
    age : Number
});

const User = mongoose.model("User", userSchema);

// User.insertMany([
//     {name:'suru', age:28, email: 'suru@gmail.com'},
//     {name:'sanjiv', age:82, email:'san@gmail.com'}
// ]).then(res=> {console.log(res)});

// const user2 = new User({
//     name:'eve',
//     age:48,
//     email : 'eve@gmail.com',
// });

// user2.save();

// User.findOne({age : {$gt : 47}})
// .then(res=>{
//     console.log(res);
// })
// .catch(e=> {
//     console.log(e);
// });

// User.findById('6a802012f15884b1b95e89e8')
// .then(res=>{
//     console.log(res);
// })
// .catch(e=> {
//     console.log(e);
// });


// User.updateMany({age: {$gte : 66 }}, {age:55})
// .then(res=>{
//     console.log(res);
// }).catch(e=>{
//     console.log(e);
// });

// User.findByIdAndUpdate({ _id : '6a801e2511d30fb214aac51b' }, {age:27}, { returnDocument: 'after' })
// .then(res=>{
//     console.log(res);
// }).catch(e=>{
//     console.log(e);
// });

User.findOneAndDelete({age:48})
.then(res=>{
    console.log(res);
}).catch(e=>{
    console.log(e);
});