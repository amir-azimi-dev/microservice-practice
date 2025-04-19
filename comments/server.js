const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

let db = [];

app.get("/:postId", (req, res) => {
    const {postId} = req.params;

    const comments = db.filter(comment => comment.postId === postId);

    res.status(201).json({success: true, comments});
});

app.post("/:postId", (req, res) => {
    const commentId = Date.now() + "-" + crypto.randomUUID();
    const {postId} = req.params;
    const {comment} = req.body;

    if (!comment || !postId) {
        return res.json({success: false, message: "invalid entries!"});
    }

    const newCommentData = {id: commentId, postId, comment};

    db = [...db, newCommentData];

    res.status(201).json({success: true, newCommentData});
});

app.listen(3001, () => {
    console.log("service is runinng on port 3001 ...");
    console.log("\n----------------------------------");
});