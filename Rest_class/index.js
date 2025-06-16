const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine","ejs");
app.set("views",path.join(__dirname ,"views" ) );
app.use(express.static(path.join(__dirname,"public") ) ) ;
const port = 8080;
app.listen(port,()=>{
    console.log(`app is runningon port ${port}`);
});
const { v4: uuidv4 } = require('uuid');

let posts = [
    {
        id : uuidv4(),
        username : "apna college",
        content : "I love Coding",
    },
    {
        id : uuidv4(),
        username : "Vraj patel",
        content : "I love JS",
    },
    {
        id : uuidv4(),
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
    let id = uuidv4();
    posts.push({username,content,id});
    // res.send("post request is working well");
    res.redirect("/posts");
});
    app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    // console.log(id);
    // const post = posts.find((p)=>id === p.id); // wrong
    const post = posts.find((p) => p.id === id); // rightrs


    res.render("show.ejs",{post});
    // res.send("id is working");
});

//  app.patch("/posts/:id",(req,res)=>{
//     let { id } = req.params;
//     // let newContent = req.body.content;
//     // const post = posts.find((p) => p.id === id); 
//     // post.content = newContent;/////////// 3hr lagadya error solve ni thai have chhodu chhu aane
//     // console.log(newContent);
//     // console.log(post);
//     console.log(id);
//     console.log("patch request is working");
// }); 

app.get("/posts/:id/edit", (req, res) => {
    const { id } = req.params;
    const post = posts.find(p => p.id === id);
    res.render("edit.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
    const { id } = req.params;
    const { content } = req.body;

    const post = posts.find(p => p.id === id);
    if (post) {
        post.content = content;
    }
    res.redirect("/posts");
});

app.delete("/posts/:id", (req, res) => {
    const { id } = req.params;
    // const post = posts.find(p => p.id === id);
    posts = posts.filter(p => p.id !== id);
    res.redirect("/posts");
});