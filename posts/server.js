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

app.post("/", async (req, res) => {
    const postId = Date.now() + "-" + crypto.randomUUID();
    const {title} = req.body;

    if (!title) {
        return res.json({success: false, message: "invalid entries!"});
    }

    const newPostData = {id: postId, title};

    const eventData = {
        type: "CREATE_POST",
        data: newPostData
    };

    await fetch("http://localhost:3002/events", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(eventData)
    });

    res.status(201).json({success: true, newPostData});
});

app.post("/events", async (req, res) => {
    const eventData = req.body;
    console.log("new event:", eventData);

    res.status(201).json();
});


app.listen(3000, () => {
    console.log("service is running on port 3000 ...");
    console.log("\n----------------------------------");
});