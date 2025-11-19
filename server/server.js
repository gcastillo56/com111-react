const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded( { extended: true } ));

const PORT = process.env.PORT || 5000;

const localData = []

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

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));