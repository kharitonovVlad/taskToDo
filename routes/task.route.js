const Router = require("express");
const router = new Router();
const taskController = require("../controllers/task.controller");

router.post("/task", taskController.createTask);
router.get("/task", taskController.getTasks);
router.get("/task/:id", taskController.getOneTask);
router.put("/task", taskController.updateTask);
router.delete("/task/:id", taskController.deleteTask);

module.exports = router;
