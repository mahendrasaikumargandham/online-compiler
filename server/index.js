const express = require("express");
const cors = require("cors");
const { generateFile } = require("./generateFile");
const { executeC } = require("./executeC");
const { executeCpp } = require("./executeCpp");
const { executePy } = require("./executePy");
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    return res.json({hello: "World!!"});
});

app.post("/run", async (req, res) => {
    const { language = "c", code } = req.body;

    if (code === undefined) {
        return res.status(400).json({ success: false, error: "Empty Code!"})
    }
    try {
        const filepath = await generateFile( language, code );
        let output;
        if (language === "c") {
            output = await executeC(filepath);
        } else if (language === "py") {
            output = await executePy(filepath);
        } else if (language === "cpp") {
            output = await executeCpp(filepath);
        }
        return res.json({ filepath, output });
    } catch(err) {
        res.status(500).json({ err });
    }
});

app.listen(5000, () => {
    console.log(`listening on port 5000!!`);
});