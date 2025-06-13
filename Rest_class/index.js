const express = require("express");
const app = express();
const path = require("path");
app.use(express.urlencoded({ extended: true }));
app.set("view engine","ejs");
app.set("views",path.join(__dirname ,"views" ) );
app.use(express.static(path.join(__dirname,"public") ) ) ;
const port = 8080;
app.listen(port,()=>{
    console.log(`app is runningon port ${port}`);
});

let posts = [
    {
        username : "apna college",
        content : "I love Coding",
    },
    {
        username : "Vraj patel",
        content : "I love JS",
    },
    {
        username : "Bansii patel",
        content : "I love C",
    },

];

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});
app.post("/post",(req,res)=>{
    let {username,content} = req.body;
    posts.push({username,content});
    res.send("post request is working well");
});