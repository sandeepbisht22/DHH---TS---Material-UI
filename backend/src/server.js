"use strict";
exports.__esModule = true;
var express_1 = require("express");
var rappers_1 = require("./routes/rappers");
var beatProducer_1 = require("./routes/beatProducer");
var user_1 = require("./routes/user");
var auth_1 = require("./routes/auth");
var song_1 = require("./routes/song");
var userChoice_1 = require("./routes/userChoice");
var db_1 = require("./config/db");
var app = (0, express_1["default"])();
// Making DB connection
(0, db_1["default"])();
app.use(express_1["default"].json({ strict: false }));
app.get("/", function (req, res) {
    res.json({
        msg: "DHH is here"
    });
});
var PORT = process.env.PORT || 5000;
app.use("/artist/rappers", rappers_1["default"]);
app.use("/artist/beatProducers", beatProducer_1["default"]);
app.use("/user", user_1["default"]);
app.use("/auth", auth_1["default"]);
app.use("/song", song_1["default"]);
app.use("/userchoice", userChoice_1["default"]);
app.listen(PORT, function () { return console.log("Server started on ".concat(PORT)); });
