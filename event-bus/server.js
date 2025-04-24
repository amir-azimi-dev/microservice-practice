const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.post("/events", async (req, res) => {
    const eventData = req.body;

    await fetch("http://posts-container:3000/events", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(eventData)
    });

    await fetch("http://comments-container:3001/events", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(eventData)
    });

    await fetch("http://query-container:3003/events", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(eventData)
    });

    res.status(201).json({success: true});
});

app.listen(3002, "0.0.0.0", () => {
    console.log("Event bus is running on port 3002 ...");
    console.log("\n--------------------------------")
});