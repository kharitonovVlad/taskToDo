import Task from '../../classes/Task';
import SubTask from '../../classes/SubTask';

const connectionString = 'tasks';

let tasks = [];

function convertTasks(tasks) {
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

  return convertedTasks;
}

export const taskService = {
  getTasks: () => {
    return fetch('http://localhost:8080/api/task', {
      method: 'GET',
    })
      .then(
        (res) => res.json(),
        (err) => {
          console.log(err);
          tasks = JSON.parse(localStorage.getItem(connectionString));
          if (tasks && tasks.length) {
            tasks = convertTasks(tasks);
          } else {
            tasks = [];
          }

          return tasks;
        }
      )
      .then((res) => {
        tasks = res;
        if (tasks && tasks.length) {
          tasks = convertTasks(tasks);
        } else {
          tasks = [];
        }

        return tasks;
      });
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
  updateSubTasks: (index, subTasks) => {
    tasks[index].subTasks = subTasks;
    taskService.saveTasks();
  },
};
