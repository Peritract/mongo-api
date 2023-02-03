const express = require("express");
const cors = require("cors");

const app = express();

const spellRouter = require("./routers/spell");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Spells API"
    })
})

app.use("/spells", spellRouter);

module.exports = app;