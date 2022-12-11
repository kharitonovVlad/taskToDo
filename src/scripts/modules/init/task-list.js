import createTask from './event-listeners/create-task';
import { idService } from '../services/id-service';
import { clickListenersService } from '../services/click-listeners-service';

function getCreateTaskTemplate() {
  return `<div class="input-group" style='border-bottom: 1px solid rgba(0, 0, 0, 0.125);'>
            <input
              type="text"
              class="form-control"
              placeholder="Имя задачи"
              aria-label="Имя задачи"
              id="createTaskInput"
            />
            <button class="btn btn-outline-secondary" type="button" id="createTaskButton">
              Добавить
            </button>
          </div>`;
}

function getTaskItemTemplate(task, index, currentIndex) {
  return `
      <button
        type='button'
        class='list-group-item list-group-item-action ${
          index === currentIndex ? 'active' : ''
        } task-item'
      >
        ${task.title}
        <span class='badge rounded-pill text-bg-light'>${task.time}</span>
      </button>
    `;
}

function initTaskList(tasks, currentIndex) {
  const menu = document.querySelector('.menu');
  const tasksList = [];

  menu.innerHTML = '';

  tasks.forEach((task, index) => {
    task.time = task.subTasks.reduce((sum, current) => {
      return current.done ? sum : sum + +current.time;
    }, 0);
    tasksList.push(getTaskItemTemplate(task, index, currentIndex));
  });

  menu.insertAdjacentHTML('afterbegin', getCreateTaskTemplate());
  menu.insertAdjacentHTML(
    'beforeend',
    `<div class="list-group" id="taskList">
          ${tasksList.join('')}
        </div>`
  );

  document
    .querySelector('#createTaskButton')
    .addEventListener('click', createTask);

  idService.setForTasks();
  clickListenersService.setForTasks();
}

export default initTaskList;
