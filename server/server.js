const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded( { extended: true } ));

const PORT = process.env.PORT || 5000;

const localData = []
const registeredUsers = []

app.get("/", (req, res) => {
    res.send("Hello")
});

app.get("/api/ping", (req, res) => {
    res.send("Hello")
});

app.get("/api/posts", (req, res)=>{ 
    if(localData.length == 0) {
        const data = require('../data/posts.json');
        localData.push(...data)
    }
    res.json(localData);
});

app.post("/api/posts/new", (req, res) => {
    const { title, author, content } = req.body;
    if(localData.length == 0) {
        const data = require('../data/posts.json');
        localData.push(...data)
    }
    localData.push({
        "id" : localData.length + 1,
        "title" : title,
        "author" : { "name" : author },
        "createdAt": new Date(),
        "content" : content
    });
    res.json(localData);
});

app.delete("/api/posts/:idx", (req, res) => {
    var delIdx = parseInt(req.params.idx);
    if(localData.length != 0) {
        const postIdx = localData.findIndex((post) => post.id === delIdx );
        if (postIdx !== -1) {
            localData.splice(postIdx, 1); 
        }
    }
    res.json(localData);
});

// NOTE: We add the post method for this route to allow edition
app.post("/api/posts/:idx", (req, res) => {
    var editIdx = parseInt(req.params.idx);
    if(localData.length != 0) {
        // NOTE: We extract the fields that are editable and search for the entry to edit
        const { title, author, content } = req.body;
        const postIdx = localData.findIndex((post) => post.id === editIdx );
        localData[postIdx] = {
            ...localData[postIdx],
            "title" : title,
            "author" : { "name" : author },
            "content" : content
        }
    }
    res.json(localData);
});

// NOTE: Add an endpoint to allow logging in
app.post("/api/login", (req, res) => {
    if(registeredUsers.length == 0) {
        // We will take the users from a file
        const data = require('../data/users.json');
        registeredUsers.push(...data)
    }
    const { email, password } = req.body;
    const userIdx = registeredUsers.findIndex((auser) => auser.user === email );
    if (userIdx !== -1) {
        if(registeredUsers[userIdx].password === password) {
            res.json(registeredUsers[userIdx]);
        } else {
            res.json({ 'error': 'Wrong credentials' });
        }
    } else {
        res.json({ 'error': 'Wrong credentials' });
    }
});

// NOTE: Add an endpoint for registration
app.post("/api/register", (req, res) => {
    if(registeredUsers.length == 0) {
        // We will take the users from a file
        const data = require('../data/users.json');
        registeredUsers.push(...data)
    }
    const { name, email, password } = req.body;
    // NOTE: Check if it exist based on the email that should be unique
    const userIdx = registeredUsers.findIndex((auser) => auser.user === email );
    if (userIdx === -1) {
        const newUser = { 
            "user": email,
            "password": password,
            "name": name,
            "id" : `blog_0${registeredUsers.length + 1}`
        }
        registeredUsers.push(newUser);
        res.json(newUser);
    } else {
        res.json({ 'error': 'Email already in use' });
    }
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));