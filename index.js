const express = require("express");
const cors = require('cors');
const fs = require("fs");

const app = express();
const jsonParser = express.json();

app.use(express.static(__dirname + "/public"));

const filePath = "delivery.json";

const corsOptions = {
    origin: 'http://delivery.dsidorchuk.com.ua/',
    optionsSuccessStatus: 200
};

app.options('/shops', cors());
app.get("/shops", cors(corsOptions), (req, res) => {
    
    const content = fs.readFileSync(filePath, "utf8");
    const contentList = JSON.parse(content);
    res.send(contentList['shops']);
});

app.listen(80);