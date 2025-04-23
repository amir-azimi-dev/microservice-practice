const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

let db = [];

app.get("/", async (req, res) => {
    res.json({posts: db});
});

app.post("/events", async (req, res) => {
    const eventData = req.body;
    await eventHandler(eventData);

    res.status(201).json();
});

const eventHandler = async eventData => {
    if (eventData.type === "CREATE_POST") {
        const newPostData = {
            ...eventData.data,
            comments: []
        };

        db = [...db, newPostData];

    } else if (eventData.type === "CREATE_COMMENT") {
        const newCommentData = {
            id: eventData.data.id,
            comment: eventData.data.comment
        };

        const targetPostIndex = db.findIndex(post => post.id === eventData.data.postId);

        if (targetPostIndex !== -1) {
            db[targetPostIndex].comments = [...db[targetPostIndex].comments, newCommentData]
        }
    }
};

app.listen(3003, () => {
    console.log("Query is running on port 3003 ...");
    console.log("\n--------------------------------")
});