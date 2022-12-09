import Task from '../../../classes/Task';
import { taskService } from '../../services/task-service';
import { idService } from '../../services/id-service';
import { clickListenersService } from '../../services/click-listeners-service';
import onTaskClick from './task-click';

function addNewTaskToList(newTask) {
  const taskList = document.querySelector('#taskList');

  taskList.insertAdjacentHTML(
    'afterbegin',
    `<button
        type='button'
        class='list-group-item list-group-item-action'
      >
        ${newTask.title}
        <span class='badge rounded-pill text-bg-light'>${newTask.time}</span>
       </button>`
  );
}

function createTask() {
  const createTaskInput = document.querySelector('#createTaskInput');
  const newTask = new Task(createTaskInput.value);
  createTaskInput.value = '';

  addNewTaskToList(newTask);
  taskService.addTask(newTask);
  idService.setForTasks();
  clickListenersService.setForTasks();

  onTaskClick(0);
}

export default createTask;
