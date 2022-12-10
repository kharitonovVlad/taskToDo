import Task from '../../classes/Task';
import SubTask from '../../classes/SubTask';

const connectionString = 'tasks';

let tasks = [];

export const taskService = {
  getTasks: () => {
    tasks = JSON.parse(localStorage.getItem(connectionString));

    if (tasks.length) {
      const convertedTasks = [];
      tasks.forEach((task) => {
        let convertedTask;
        const convertedSubs = [];

        if (task.subTasks.length) {
          task.subTasks.forEach((sub) => {
            let convertedSub = new SubTask(
              sub.title,
              sub.time,
              sub.done,
              sub.description
            );
            convertedSubs.push(convertedSub);
          });

          convertedTask = new Task(
            task.title,
            convertedSubs,
            task.time,
            task.done,
            task.description
          );
        } else {
          convertedTask = new Task(
            task.title,
            convertedSubs,
            task.time,
            task.done,
            task.description
          );
        }

        convertedTasks.push(convertedTask);
      });

      tasks = convertedTasks;
    } else {
      tasks = [];
    }

    return tasks;
  },
  saveTasks: () => {
    localStorage.setItem(connectionString, JSON.stringify(tasks));
  },
  addTask: (newTask) => {
    tasks.unshift(newTask);
    taskService.saveTasks();
  },
  getTask: (taskIndex) => {
    return tasks[taskIndex];
  },
  removeTask: (taskIndex) => {
    tasks = tasks.filter((task, index) => {
      return index !== taskIndex;
    });
    taskService.saveTasks();
  },
  updateTask: (index, task) => {
    tasks[index] = task;
    taskService.saveTasks();
  },
  getSubTasks: (index) => {
    return tasks[index].subTasks;
  },
};
