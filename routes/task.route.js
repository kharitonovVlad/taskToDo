const Router = require("express");
const cors = require("cors");
const router = new Router();
const taskController = require("../controllers/task.controller");

const corsOptions = {
  origin: "http://localhost:2022",
};

router.post("/task", cors(corsOptions), taskController.createTask);
router.get("/task", cors(corsOptions), taskController.getTasks);
router.get("/task/:id", cors(corsOptions), taskController.getOneTask);
router.put("/task", cors(corsOptions), taskController.updateTask);
router.delete("/task/:id", cors(corsOptions), taskController.deleteTask);

module.exports = router;
