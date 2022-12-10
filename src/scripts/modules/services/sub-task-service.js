import { taskService } from './task-service';

let subTasks = [];

export const subTaskService = {
  getSubTasks: (index) => {
    subTasks = index !== null ? taskService.getSubTasks(index) : subTasks;
    return subTasks;
  },
  addSubTask: (newSubTask) => {
    subTasks.unshift(newSubTask);
    taskService.saveTasks();
  },
};
