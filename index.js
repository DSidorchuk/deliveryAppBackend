const express = require("express");
const cors = require('cors');
const fs = require("fs");

const app = express();

app.use(express.static(__dirname + "/public"));
const filePath = "delivery.json";
const content = fs.readFileSync(filePath, "utf8");
const contentList = JSON.parse(content);


const corsOptions = {
    origin: 'http://delivery.dsidorchuk.com.ua',
    optionsSuccessStatus: 200
};

app.options('/shops', cors());
app.get("/shops", cors(corsOptions), (req, res) => {
    
    res.send(contentList['shops']);
});

app.options("/:shopId", cors());
app.get("/:shopId", cors(corsOptions), (req, res) => {
    const shopId = req.params["shopId"];
    res.send(contentList[shopId]);
});

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

app.options('/coupones', cors());
app.get('/coupones', cors(corsOptions), (req, res) => {
    
    res.send(contentList['/coupones']);
});

app.listen(80);

/*
Запросы на сервер:
1. Магазины Х
2. Товары по магазину Х
3. Акции Х
4. Конкретный товар
5. История заказов
6. Сохранение заказа
*/