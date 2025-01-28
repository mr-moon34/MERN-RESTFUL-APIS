const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');




const app = express();
const port = 8080;


// Middleware to parse incoming data (URL-encoded and JSON)
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Call the function here for json data if needed

//Method Override
app.use(methodOverride('_method'));

let posts = [
    {
        id: uuidv4(),
        username:"Moon Khan",
        content: "Web Developer",
    },
    {
        id: uuidv4(),
        username:"Rustam Khan",
        content: "Hard Worker",
    },
    {
        id: uuidv4(),
        username:"Hamza Khan",
        content: "Electrical Engineer",
    }
]

// Setting up the EJS template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//For public folder style.css
app.use(express.static(path.join(__dirname, "public")));

// Default route
app.get("/", (req, res) => {
    res.send("Server is working well");
});

//All Post Showing
app.get("/posts" , (req , res) => {
    res.render("index.ejs" , {posts: posts} );
})

//Create new post route
app.get("/posts/new" , (req , res) => {
    res.render("new.ejs" );
})

//Post add
app.post("/posts" , (req , res) => {
    let { username , content } = req.body;
    let id = uuidv4();
    posts.push({id , username , content});
    // res.send("Post Request Working");
    res.redirect("/posts");
});

//Show Post in Detail
app.get ("/posts/:id" , (req , res) => {
    let {id} = req.params;
    console.log(id);
    let post = posts.find((p) => id === p.id );
    res.render("show.ejs" , {post} );
});

//Edit Patch 
app.patch("/posts/:id" , (req , res) => {
    let {id} = req.params;
    // let newUsername = req.body.username;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id );
    // post.username = newUsername;
    post.content=newContent;
    console.log(post);
    // res.send("Patch Request Working");
    res.redirect("/posts");
});

//Get Patch Request
app.get("/posts/:id/edit" , (req , res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id );
    res.render("edit.ejs" , {post} );
});

//Delete Route
app.delete("/posts/:id" , (req , res) => {
    let {id} = req.params;
    posts = posts.filter((p) => id !== p.id );
    res.redirect("/posts");
});



// Start the server and check if it's running
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
