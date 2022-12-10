import { taskService } from './task-service';

let subTasks = [];
let taskIndex;

export const subTaskService = {
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
    subTasks.unshift(newSubTask);
    taskService.saveTasks();
  },
  removeSubTask: (subIndex) => {
    subTasks = subTasks.filter((subTask, index) => {
      return index !== subIndex;
    });
    taskService.updateSubTasks(taskIndex, subTasks);
  },
  updateSubTask: (subIndex, subTask) => {
    subTasks[subIndex] = subTask;
    taskService.updateSubTasks(taskIndex, subTasks);
  },
};
