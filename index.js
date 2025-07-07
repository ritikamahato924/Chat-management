const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override")

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

app.use(express.urlencoded({extended:true}));

const mongoose = require('mongoose');

main()
.then(() => {
    console.log("connection successful");
})
.catch((err) => {
    console.log(err)
});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
};

//Index Route
app.get("/chats", async (req, res) => {
    let chats = await Chat.find();
    // console.log(chats);
    res.render("index.ejs", { chats} );
});

//New & Create Route
app.get("/chats/new", (req,res) => {
    res.render("new.ejs");
});
app.post("/chats", (req,res) => {
    let {from, to, msg} = req.body;
    let newChat = new Chat({
        from:from,
        to:to,
        msg:msg,
        created_at: new Date(),
    });

    newChat.save().then((res) => {
        console.log("chat was saved!");
    }).catch((err) => {
        console.log(err);
    })
    res.redirect("/chats");
});

//Edit & Update Route
app.get("/chats/:id/edit", async (req,res) => {
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", { chat });
});
app.put("/chats/:id", async (req,res) =>{
    let {id} = req.params;
    let {msg : newMsg} = req.body;

    let updatedChat = await Chat.findByIdAndUpdate(id, {msg : newMsg}, {runValidatores:true, new:true});
    console.log(updatedChat);
    res.redirect("/chats");
    
});
//DELETE ROUTE
app.delete("/chats/:id", async(req,res) => {
    let {id} = req.params;
    let updatedChat = await Chat.findByIdAndDelete(id);
    console.log(updatedChat);
    res.redirect("/chats");
})

// let chat1 = new Chat({
//     from : "neha",
//     to : "dev",
//     msg : "Hello! How are you?",
//     created_at : new Date()
// });
// chat1.save();

// Chat.findByIdAndUpdate("68669495bd6f34a144db6afc", {form:"kapil"},   <-- for update
//     {to:"sonakshi"}, 
//     {msg:"Tell me something"}).then((res) =>{
//     console.log(res)
// }).catch((err) => {
//     console.log(err);
// })

// Chat.findByIdAndDelete("68669406cb0123cdc2c478d2").then((res) => {    <-- for delete 
//     console.log(res);
// }).catch((err) => {
//     console.log(err);
// })



app.get("/", (req,res) => {
    res.send("server working..!");
});

app.listen(port, () => {
    console.log(`app is listening on port : ${port}`);
});