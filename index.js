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


app.get("/:shopId", cors(corsOptions), (req, res) => {
    const shopId = req.params["shopId"];
    res.send(contentList[shopId]);
});

app.listen(80);

/*
Запросы на сервер:
1. Магазины Х
2. Товары по магазину
3. Акции
4. Конкретный товар
5. История заказов
6. Сохранение заказа
*/