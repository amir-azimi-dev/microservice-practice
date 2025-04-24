const express = require("express");
const cors = require("cors");

const app = express();

let db = [];

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get("/:postId", (req, res) => {
    const {postId} = req.params;

    const comments = db.filter(comment => comment.postId === postId);

    res.status(201).json({success: true, comments});
});

app.post("/:postId", async (req, res) => {
    const commentId = Date.now() + "-" + crypto.randomUUID();
    const {postId} = req.params;
    const {comment} = req.body;

    if (!comment || !postId) {
        return res.json({success: false, message: "invalid entries!"});
    }

    const newCommentData = {id: commentId, postId, comment};

    const eventData = {
        type: "CREATE_COMMENT",
        data: newCommentData
    };

    await fetch("http://event-bus-container:3002/events", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(eventData)
    });

    res.status(201).json({success: true, newCommentData});
});

app.post("/events", async (req, res) => {
    const eventData = req.body;
    console.log("new event:", eventData);

    res.status(201).json();
});

app.listen(3001, "0.0.0.0", () => {
    console.log("service is running on port 3001 ...");
    console.log("\n----------------------------------");
});