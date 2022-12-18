const Router = require("express");
const router = new Router();
const subTaskController = require("../controllers/sub-task.controller");

router.post("/sub-task", subTaskController.createSubTask);
router.get("/sub-tasks/:id", subTaskController.getSubTasksByTaskId);
router.get("/sub-task/:id", subTaskController.getOneSubTask);
router.put("/sub-task", subTaskController.updateSubTask);
router.delete("/sub-task/:id", subTaskController.deleteSubTask);

module.exports = router;
