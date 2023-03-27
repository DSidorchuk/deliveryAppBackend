const express = require("express");
const cors = require('cors');
const fs = require("fs");

const app = express();

// Instead of data base I have text file
app.use(express.static(__dirname + "/public"));
const filePath = "delivery.json";
const content = fs.readFileSync(filePath, "utf8");
const contentList = JSON.parse(content);


const corsOptions = {
    origin: 'http://delivery.dsidorchuk.com.ua',
    optionsSuccessStatus: 200
};

// Get list of shops for main page 
app.options('/shops', cors());
app.get("/shops", cors(corsOptions), (req, res) => {
    
    res.send(contentList['shops']);
});

// Get list of products in according to choosen shop
app.options("/:shopId", cors());
app.get("/:shopId", cors(corsOptions), (req, res) => {
    const shopId = req.params["shopId"];
    res.send(contentList[shopId]);
});

// Get data of single product by it`s shop and id
app.options("/:shopId/:itemId", cors());
app.get("/:shopId/:itemId", cors(corsOptions), (req, res) => {
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
    res.send(contentList['/coupones']);
});

app.options("/orders", cors());
app.get("/orders", cors(corsOptions), (req, res) => {
    let orders = contentList["orders"].filter(item => {
        item.phone === req.query.phone;
    });
    res.send(orders);
});

app.listen(80);

/*
Запросы на сервер:
1. Магазины Х
2. Товары по магазину Х
3. Акции Х
4. Конкретный товар Х
5. История заказов
6. Сохранение заказа
*/