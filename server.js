const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const sequelize = require("./config/connections.js");
const routes = require("./routes");

const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));

const PORT = process.env.PORT || 3000;

const rebuild = process.argv[2] === "--rebuild";

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.htm"));
});

app.use(routes);

sequelize.sync({force: rebuild}).then(() => {
    app.listen(PORT, () => console.log("Now listening"));
});