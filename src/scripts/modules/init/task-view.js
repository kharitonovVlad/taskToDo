import { taskService } from '../services/task-service';
import { taskListeners } from './event-listeners/task-listeners';
import createSubTask from './event-listeners/create-sub-task';
import subTasksInit from './sub-task/sub-tasks-init';

function initTaskView(index) {
  const content = document.querySelector('.content');
  content.innerHTML = '';

  const task = taskService.getTask(index);

  content.insertAdjacentHTML(
    'afterbegin',
    `<h2>Задача</h2>
          <div class="section-container position-relative">
            <span
              class="position-absolute top-0 start-100 translate-middle badge bg-${
                !task.done ? 'primary' : 'success'
              }"
            >
              ${!task.done ? 'В процессе' : 'Готово'}
              <span class="visually-hidden">Статус</span>
            </span>
  
            <div class="input-group task-name">
              <button class="btn btn-outline-danger remove-button" type="button" id="removeTaskButton">
                <i class="bi bi-x"></i>
              </button>
              <button
                class="btn btn-outline-warning desc-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseExample"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                <i class="bi bi-book"></i>
              </button>
              <div class="form-floating hours">
                <input
                  type="text"
                  class="form-control"
                  id="hoursInput"
                  placeholder="ч"
                  value="${task.time}"
                  disabled
                />
                <label for="hoursInput">Время</label>
              </div>
              <div class="form-floating">
                <input
                  type="text"
                  class="form-control"
                  id="nameInput"
                  placeholder="Имя задачи"
                  value="${task.title}"
                />
                <label for="nameInput">Имя задачи</label>
              </div>
              <button class="btn btn-outline-success done" type="button" id="doneTaskButton">
                <i class="bi bi-${
                  !task.done ? 'check2' : 'arrow-counterclockwise'
                }"></i>
              </button>
            </div>
  
            <div class="description">
              <div class="collapse" id="collapseExample">
                <textarea
                  class="form-control"
                  placeholder="Описание задачи"
                  aria-label="Описание задачи"
                  id="descriptionTextArea"
                  style="height: 65px"
                >${task.description}</textarea>
              </div>
            </div>
          </div>`
  );

  document.querySelector('#removeTaskButton').addEventListener('click', () => {
    taskListeners.remove(index);
  });

  document.querySelector('#doneTaskButton').addEventListener('click', () => {
    taskListeners.done(index);
  });

  document.querySelector('#nameInput').addEventListener('change', (event) => {
    taskListeners.updateTitle(index, event.target.value);
  });

  document
    .querySelector('#descriptionTextArea')
    .addEventListener('change', (event) => {
      taskListeners.updateDescription(index, event.target.value);
    });

  content.insertAdjacentHTML(
    'beforeend',
    `<div class="section-container">
          <h5>Добавить подзадачу</h5>
          <div class="input-group create-sub">
            <input
              type="text"
              class="form-control"
              placeholder="Имя подзадачи"
              aria-label="Имя подзадачи"
              id="createSubTaskInput"
            />
            <button class="btn btn-outline-success create-button" type="button" id="createSubTaskButton">
              <i class="bi bi-plus"></i>
            </button>
          </div>
        </div>
        <div id="subTasksContainer"></div>`
  );

  document
    .querySelector('#createSubTaskButton')
    .addEventListener('click', createSubTask);

  document
    .querySelector('#createSubTaskInput')
    .addEventListener('keydown', (event) => {
      if (event.code === 'Enter') {
        createSubTask();
      }
    });

  subTasksInit(index);
}

export default initTaskView;
