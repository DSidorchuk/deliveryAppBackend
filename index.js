const express = require("express");
const cors = require('cors');
const fs = require("fs");

const app = express();

// Instead of data base I have text file
app.use(express.static(__dirname + "/public"));
const filePath = "delivery.json";
const content = fs.readFileSync(filePath, "utf8");
const contentList = JSON.parse(content);

// Add received from website order data to json file
const addOrder = (order) => {
    let newContent = contentList['orders'].push(order);
    newContent = JSON.parse(newContent).toString();
    fs.writeFileSync(filePath, newContent);
}

const corsOptions = {
    origin: 'http://delivery.dsidorchuk.com.ua',
    optionsSuccessStatus: 200
};

// Get list of shops for main page 
app.options('/shopslist', cors());
app.get("/shopslist", cors(corsOptions), (req, res) => {
    res.send(contentList['shops']);
});

// Get list of products in according to choosen shop
app.options("/products", cors());
app.get("/products", cors(corsOptions), (req, res) => {
    const shopId = req.query.shop;
    res.send(contentList[shopId]);
});

// Get data of single product by it`s shop and id
app.options("/product/:shopId/:itemId", cors());
app.get("/product/:shopId/:itemId", cors(corsOptions), (req, res) => {
    const shopId = req.params["shopId"];
    const itemId = req.params["itemId"];
    contentList[shopId].forEach(item => {
        if (item.id === itemId) {
            res.send(item);
        }
    })
});

// Get list of coupones for coupones page
app.options('/coupones', cors());
app.get('/coupones', cors(corsOptions), (req, res) => {
    res.send(contentList['coupones']);
});

// Get orders list by phone
app.options("/history/:phone", cors());
app.get("/history/:phone", cors(corsOptions), (req, res) => {
    const phone = req.params["phone"];
    const orders = contentList['orders'].filter(item => item.phone === phone);
    res.send(orders);
});

// Send and safe order
app.use(express.json());
app.options("/order", cors());
app.post("/order", cors(corsOptions), (req, res) => {
    if (!req.body) return res.sendStatus(400);
    addOrder(req.body);
    res.send(req.body);
});

app.listen(80);