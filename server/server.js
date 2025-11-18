const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

const localData = []

app.get("/", (req, res) => {
    res.send("Hello")
});

app.get("/api/ping", (req, res) => {
    res.send("Hello")
});

app.get("/api/posts", (req, res)=>{ 
    console.log("Hitting endpoint")
    if(localData.length == 0) {
        const data = require('../data/posts.json');
        localData.push(...data)
    }
    res.json(localData);
});

app.post("/api/posts/new", (req, res) => {
    const { title, author, content } = req.body;
    localData.append({
        "id" : localData.length,
        "title" : title,
        "author" : { "name" : author },
        "createdAt": new Date(),
        "content" : content
    });
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));