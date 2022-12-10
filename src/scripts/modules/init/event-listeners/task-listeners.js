import { taskService } from '../../services/task-service';
import initView from '../../init-view';

export const taskListeners = {
  remove: (index) => {
    taskService.removeTask(index);
    initView(index);
  },
  done: (index) => {
    const task = taskService.getTask(index);
    const isDone = !task.done;

    task.setDone(isDone);
    taskService.updateTask(task);
    initView(index);
  },
  updateTitle: (index, newTitle) => {
    const task = taskService.getTask(index);

    document.querySelector(`#taskItem-${index}`).innerText = newTitle;
    task.setTitle(newTitle);
    taskService.updateTask(task);
  },
  updateDescription: (index, newDesc) => {
    const task = taskService.getTask(index);

    task.setDesc(newDesc);
    taskService.updateTask(task);
  },
};
