const db = require("../db");

class TaskController {
  async createTask(req, res) {
    const { title } = req.body;
    const newTask = await db.query(
      "INSERT INTO task (title, is_done) VALUES ($1, $2) RETURNING *",
      [title, false]
    );

    res.json(newTask.rows[0]);
  }

  async getTasks(req, res) {
    const tasks = await db.query("SELECT * FROM task");

    res.json(tasks.rows);
  }

  async getOneTask(req, res) {
    const id = req.params.id;
    const task = await db.query("SELECT * FROM task WHERE id = $1", [id]);

    res.json(task.rows[0]);
  }

  async updateTask(req, res) {
    const { id, title, description, isDone } = req.body;
    const updatedTask = await db.query(
      "UPDATE task SET title=$1, description=$2, is_done=$3 WHERE id=$4 RETURNING *",
      [title, description, isDone, id]
    );

    res.json(updatedTask.rows[0]);
  }

  async deleteTask(req, res) {
    const id = req.params.id;
    await db.query("DELETE FROM task WHERE id=$1", [id]);

    res.json();
  }
}

module.exports = new TaskController();
