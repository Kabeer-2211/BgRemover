const db = require("./db/config.db");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
const AuthRoutes = require("./routes/Auth.routes");
const RemoveBgRoutes = require("./routes/RemoveBg.routes");
const fs = require('fs');

dotenv.config();
db();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static('public'));

app.use("/api/auth", AuthRoutes);
app.use("/api", RemoveBgRoutes);
app.get("/api/DEL00", (req, res) => {
    const files = fs.readdirSync('./public/TEMP');
    for (const file of files) {
        const time = file.split('-')[0];
        const newTime = Date.now();
        if (newTime - time > 1) {
            fs.unlinkSync(`./public/TEMP/${file}`);
        }
    } fs.readdirSync('./public/TEMP').forEach(file => {
        fs.unlinkSync(`./public/TEMP/${file}`);
    });
    res.json({ success: true, message: 'All files deleted successfully' });
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
