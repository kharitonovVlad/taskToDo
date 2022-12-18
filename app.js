const express = require("express");
const path = require("path");
const taskRouter = require("./routes/task.route");
const subTaskRouter = require("./routes/sub-task.route");
const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use("/api", taskRouter, subTaskRouter);

app.use(express.static(path.resolve(__dirname, "client", "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}...`);
});
