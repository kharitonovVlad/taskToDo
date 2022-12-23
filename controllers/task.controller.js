const db = require("../db");
const defaultErrorMessage =
  "Произошла ошибка на сервере. Проверьте введенные данные";

class TaskController {
  async createTask(req, res) {
    try {
      const { title } = req.body;
      const newTask = await db.query(
        "INSERT INTO task (title,description, is_done) VALUES ($1, $2, $3) RETURNING *",
        [title, "", false]
      );

      res.json(newTask.rows[0]);
    } catch (err) {
      res.status(500).json(defaultErrorMessage);
    }
  }

  async getTasks(req, res) {
    try {
      const tasks = await db.query("SELECT * FROM task");

      await Promise.all(
        tasks.rows.map(async (task) => {
          const subTasks = await db.query(
            "SELECT * FROM sub_task WHERE task_id=$1",
            [task.id]
          );
          task.subTasks = subTasks.rows;

          return task;
        })
      );

      res.json(tasks.rows);
    } catch (err) {
      res.status(500).json(defaultErrorMessage);
    }
  }

  async getOneTask(req, res) {
    try {
      const id = req.params.id;
      const task = await db.query("SELECT * FROM task WHERE id = $1", [id]);

      res.json(task.rows[0]);
    } catch (err) {
      res.status(500).json(defaultErrorMessage);
    }
  }

  async updateTask(req, res) {
    try {
      const { id, title, description, isDone } = req.body;
      const updatedTask = await db.query(
        "UPDATE task SET title=$1, description=$2, is_done=$3 WHERE id=$4 RETURNING *",
        [title, description, isDone, id]
      );

      res.json(updatedTask.rows[0]);
    } catch (err) {
      res.status(500).json(defaultErrorMessage);
    }
  }

  async deleteTask(req, res) {
    try {
      const id = req.params.id;
      await db.query("DELETE FROM task WHERE id=$1", [id]);

      res.json();
    } catch (err) {
      res.status(500).json(defaultErrorMessage);
    }
  }
}

module.exports = new TaskController();
