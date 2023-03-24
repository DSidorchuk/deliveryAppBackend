const express = require("express");
const fs = require("fs");

const app = express();
const jsonParser = express.json();

app.use(express.static(__dirname + "/public"));

const filePath = "delivery.json";
app.get("/shops", (req, res) => {
    
    const content = fs.readFileSync(filePath, "utf8");
    const contentList = JSON.parse(content);
    res.send(contentList['shops']);
});

app.listen(3000);