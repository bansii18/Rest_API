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
        id : "1a",
        username : "apna college",
        content : "I love Coding",
    },
    {
        id : "2b",
        username : "Vraj patel",
        content : "I love JS",
    },
    {
        id : "3d",
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
app.post("/posts",(req,res)=>{
    let {username,content} = req.body;
    posts.push({username,content});
    // res.send("post request is working well");
    res.redirect("/posts");
});
    app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    // console.log(id);
    const post = posts.find((p)=>id === p.id);
    res.render("show.ejs",{post});
    // res.send("id is working");
});