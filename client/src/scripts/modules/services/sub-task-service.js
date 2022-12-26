import { taskService } from './task-service';

let subTasks = [];
let taskIndex;
let taskId;

export const subTaskService = {
  setCurrentTaskId: (id) => {
    taskId = id;
  },
  getCurrentTaskId: () => {
    return taskId;
  },
  getCurrentTaskIndex: () => {
    return taskIndex;
  },
  getSubTasks: (taskIdx) => {
    taskIndex = taskIdx !== null ? taskIdx : taskIndex;
    subTasks = taskService.getSubTasks(taskIndex);
    return subTasks;
  },
  getSubTask: (subIndex) => {
    return subTasks[subIndex];
  },
  addSubTask: (newSubTask) => {
    return fetch('http://localhost:8080/api/sub-task', {
      method: 'POST',
      body: JSON.stringify(newSubTask),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((res) => {
        subTasks.unshift(newSubTask);
        taskService.saveTasks();

        return res;
      });
  },
  removeSubTask: (subIndex) => {
    let subTaskId;
    subTasks.forEach((sub, index) => {
      if (subIndex === index) {
        subTaskId = sub.id;
      }
    });
    return fetch(`http://localhost:8080/api/sub-task/${subTaskId}`, {
      method: 'DELETE',
    }).then((res) => {
      subTasks = subTasks.filter((subTask, index) => {
        return index !== subIndex;
      });
      taskService.updateSubTasks(taskIndex, subTasks);

      return res;
    });
  },
  updateSubTask: (subIndex, subTask) => {
    return fetch('http://localhost:8080/api/sub-task', {
      method: 'PUT',
      body: JSON.stringify(subTask),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((res) => {
        subTasks[subIndex] = subTask;
        taskService.updateSubTasks(taskIndex, subTasks);

        return res;
      });
  },
};
