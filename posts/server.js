const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

let db = [];

app.get("/", (req, res) => {
    res.status(201).json({success: true, posts: db});
});

app.post("/", (req, res) => {
    const postId = Date.now() + "-" + crypto.randomUUID();
    const {title} = req.body;

    if (!title) {
        return res.json({success: false, message: "invalid entries!"});
    }

    const newPostData = {id: postId, title};
    db = [...db, newPostData];

    res.status(201).json({success: true, newPostData});
});

app.listen(3000, () => {
    console.log("service is running on port 3000 ...");
    console.log("\n----------------------------------");
});