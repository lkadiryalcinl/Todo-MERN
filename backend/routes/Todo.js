const express = require("express");
const todoController = require("../controllers/Todo");
const router = express.Router();
const { verifyToken } = require('../middleware/VerifyToken')

router.post("/",verifyToken ,todoController.createTodo); 
router.get("/", todoController.getTodos); 
router.get("/:id", todoController.getTodoById); 
router.patch("/:id", todoController.updateTodo); 
router.delete("/:id", todoController.deleteTodo); 
router.delete("/",todoController.deleteAllTodos);

router.patch("/:id/favorite", todoController.toggleFavorited);
router.patch("/:id/complete", todoController.toggleCompleted);

module.exports = router;