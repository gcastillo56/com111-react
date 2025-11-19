const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
// NOTE: We forgot to configure our server with JSON encoded elements
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
    // console.log("Hitting endpoint")
    if(localData.length == 0) {
        const data = require('../data/posts.json');
        localData.push(...data)
    }
    res.json(localData);
});

// NOTE: I was using append instead of push in the adding to the array
app.post("/api/posts/new", (req, res) => {
    const { title, author, content } = req.body;
    // NOTE: We will also check this here to make sure that we always have all the original posts
    if(localData.length == 0) {
        const data = require('../data/posts.json');
        localData.push(...data)
    }
    localData.push({
        "id" : localData.length,
        "title" : title,
        "author" : { "name" : author },
        "createdAt": new Date(),
        "content" : content
    });
    // NOTE: Once we have added the new post, we will return the updated list
    res.json(localData);
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));