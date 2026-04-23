const { Router } = require("express");
const { authenticateToken } = require("../middlewares/auth");
const createTaskController = require("../controllers/tasks/createTask");
const updateTaskController = require("../controllers/tasks/updateTask");
const deleteTaskController = require("../controllers/tasks/deleteTask");
const getTaskController = require("../controllers/tasks/getTask");
const router = Router();

router.post("/create", authenticateToken, createTaskController);

router.get("/", authenticateToken, getTaskController);

router.put("/put/:id", authenticateToken, updateTaskController);

router.delete("/delete/:id", authenticateToken, deleteTaskController);


module.exports = router;