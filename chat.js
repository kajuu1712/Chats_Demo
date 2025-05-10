//Connecting to mongo DB
require('dotenv').config();
const mongoose = require('mongoose');


/* express app with mongo database */
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const path = require("path");
const methodOverride = require('method-override');

//Requiring Chat from chats.js from models folder
const Chat = require("./models/chats.js");



main()
    .then(() => console.log("Connected to the database."))
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

//Views
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
//public
app.use(express.static(path.join(__dirname, "public")));
//data parsing
app.use(express.urlencoded({extended: true}));
//method-override for POST to PATCH and DELETE
app.use(methodOverride('_method'));

//Adding data to db --> init.js
app.get("/chats", async(req, res) => {
    let chats = await Chat.find();
    res.render("home.ejs", {chats});
})

 //----------------------IMP - CREATION OF NEW CHAT ------------------------------------------
app.post("/chats", (req, res) => {
    let {from, to, msg} = req.body;
    let newChat =  new Chat({
        from: from,
        to: to, 
        msg: msg,
        created_at: new Date()
    });
    newChat.save()
    .then((res) => {     
        console.log(res); 
    }).catch((err) => {
        console.log(err);
    });

    /* 
        Where ever we use then , we dont use async-await (coz then and catch are already async func.),
        there will be no error if still use them together but still..
    */

    //console.log(newChat);
    res.redirect("/chats");
})
//-----------------------------------------------------------------------------------

app.get("/chats/new", (req, res) => {
    res.render("new.ejs");
})

app.get("/chats/:id", async(req, res) => {
    let {id} = req.params;
    let chat = await Chat.findById(id);
    //console.log(chat);
    res.render("show.ejs", {chat});
})

app.get("/chats/:id/edit", async(req,res) => {
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", {chat});
})

//--------------------------IMP - EDIT MESSAGE ----------------------------
app.put("/chats/:id", async(req, res) => {
    let {id} = req.params;
    //let {msg : newMsg} = req.body;  //can do like this
    let {msg} = req.body;
    //updating chat with curent date and time
    let updatedChat = await Chat.findByIdAndUpdate(id, {msg, created_at: Date.now()}, {runValidators: true}, {new: true});
    res.redirect(`/chats/${id}`);   //re-directing to show route
})
//----------------------------------------------------------

app.delete("/chats/:id", async(req, res) => {
    let {id} = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    res.redirect("/chats");
})

app.get("/", (req, res) => {
    res.redirect("/chats");
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})