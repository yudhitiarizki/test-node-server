const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const router = require("./routes/index.js");

require('dotenv').config();

const app = express();
const public = __dirname + "/public/";
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use('/public/uploads', express.static(path.join(public, "uploads")));

app.use(router);

app.get('/', function(req, res) {
    res.sendFile(path.join(public + "index.html"));
});

app.listen(PORT, () => console.log(`Server Running on PORT ${PORT}`))