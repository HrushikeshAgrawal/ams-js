const express = require("express");
const app = express();
const path = require("path");

const connectDB = require("./config/db");

connectDB();

app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.send("HEY! :D");
});

app.use("/auth", require("./routes/auth"));
app.use("/add", require("./routes/add"));
app.use("/view", require("./routes/view"));
app.use("/attendance", require("./routes/attendance"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
