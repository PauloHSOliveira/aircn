const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");//para liberar acesso a api
const path = require('path');

const routes = require("./routes");

const app = express();

mongoose.connect('mongodb://localhost:27017/aircnc', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});//objeto para remover avisos ao conectar

//req.query = acessar query params (para filytos0)
//req.params = acessar rote params (para edição e delete)
//req.body = acessar corpo da requisição (para criação, edição)

app.use(cors());
app.use(express.json()); //Para informar que vai utilizar o formato json
app.use('/files', express.static(path.resolve(__dirname, '../','uploads')))
app.use(routes);

app.listen(3333);
