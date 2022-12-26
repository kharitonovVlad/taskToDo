const db = require("../db");
const defaultErrorMessage =
  "Произошла ошибка на сервере. Проверьте введенные данные";

class TaskController {
  async createTask(req, res) {
    try {
      const { title } = req.body;
      const createdDate = new Date();
      const newTask = await db.query(
        "INSERT INTO task (title, description, done, created_date) VALUES ($1, $2, $3, $4) RETURNING *",
        [title, "", false, createdDate]
      );

      res.json(newTask.rows[0]);
    } catch (err) {
      res.status(500).json(defaultErrorMessage);
    }
  }

  async getTasks(req, res) {
    try {
      const tasks = await db.query(
        "SELECT * FROM task ORDER BY created_date DESC"
      );

      await Promise.all(
        tasks.rows.map(async (task) => {
          const subTasks = await db.query(
            "SELECT * FROM sub_task WHERE task_id=$1 ORDER BY created_date DESC",
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
      const subTasks = await db.query(
        "SELECT * FROM sub_task WHERE task_id=$1",
        [task.rows.id]
      );
      task.rows[0].subTasks = subTasks.rows;

      res.json(task.rows[0]);
    } catch (err) {
      res.status(500).json(defaultErrorMessage);
    }
  }

  async updateTask(req, res) {
    try {
      const { id, title, description, done } = req.body;
      const updatedTask = await db.query(
        "UPDATE task SET title=$1, description=$2, done=$3 WHERE id=$4 RETURNING *",
        [title, description, done, id]
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
