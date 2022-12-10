import createTask from './event-listeners/create-task';
import { idService } from '../services/id-service';
import { clickListenersService } from '../services/click-listeners-service';

function initTaskList(tasks, currentIndex) {
  const menu = document.querySelector('.menu');

  menu.innerHTML = '';

  menu.insertAdjacentHTML(
    'afterbegin',
    `<div class="input-group">
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
          </div>`
  );

  document
    .querySelector('#createTaskButton')
    .addEventListener('click', createTask);

  const tasksList = [];

  tasks.forEach((task, index) => {
    task.time = task.subTasks.reduce((sum, current) => {
      return current.done ? sum : sum + +current.time;
    }, 0);

    tasksList.push(`
      <button
        type='button'
        class='list-group-item list-group-item-action ${
          index === currentIndex ? 'active' : ''
        }'
      >
        ${task.title}
        <span class='badge rounded-pill text-bg-light'>${task.time}</span>
      </button>
    `);
  });

  menu.insertAdjacentHTML(
    'beforeend',
    `<div class="list-group" id="taskList">
          ${tasksList.join('')}
        </div>`
  );

  idService.setForTasks();
  clickListenersService.setForTasks();
}

export default initTaskList;
