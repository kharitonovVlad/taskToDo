import { taskService } from '../services/task-service';
import { taskListeners } from './event-listeners/task-listeners';

function initTaskView(index) {
  const content = document.querySelector('.content');
  content.innerHTML = '';

  const task = taskService.getTask(index);

  content.insertAdjacentHTML(
    'afterbegin',
    `<h2>Задача</h2>
          <div class="section-container position-relative">
            <span
              class="position-absolute top-0 start-100 translate-middle badge bg-primary"
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
            />
            <button class="btn btn-outline-success create-button" type="button">
              <i class="bi bi-plus"></i>
            </button>
          </div>
        </div>`
  );

  const subTaskList = [];
  task.subTasks.forEach((subTask, index) => {
    subTaskList.push(`
          <div class="section-container position-relative">
            <span
              class="position-absolute top-0 start-100 translate-middle badge bg-${
                !subTask.done ? 'primary' : 'success'
              }"
            >
              ${!subTask.done ? 'В процессе' : 'Готово'}
              <span class="visually-hidden">Статус</span>
            </span>
  
            <div class="input-group sub-name">
              <button class="btn btn-outline-danger remove-button" type="button" ${
                !subTask.done ? '' : 'disabled'
              }>
                <i class="bi bi-x"></i>
              </button>
              <button
                class="btn btn-outline-warning desc-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseSub${index}"
                aria-expanded="false"
                aria-controls="collapseSub${index}"
              >
                <i class="bi bi-book"></i>
              </button>
              <div class="form-floating hours">
                <input
                  type="text"
                  class="form-control"
                  id="hoursInput${index}"
                  placeholder="ч"
                  value="${subTask.time}"
                  ${!subTask.done ? '' : 'disabled'}
                />
                <label for="hoursInput${index}">Время</label>
              </div>
              <div class="form-floating">
                <input
                  type="text"
                  class="form-control"
                  id="subNameInput${index}"
                  placeholder="Имя подзадачи"
                  value="${subTask.title}"
                />
                <label for="subNameInput${index}">Имя подзадачи</label>
              </div>
              <button class="btn btn-outline-success done" type="button">
                <i class="bi bi-${
                  !subTask.done ? 'check2' : 'arrow-counterclockwise'
                }"></i>
              </button>
            </div>
            <div class="description">
              <div class="collapse" id="collapseSub${index}">
                <textarea
                  class="form-control"
                  placeholder="Описание подзадачи"
                  aria-label="Описание подзадачи"
                  style="height: 65px"
                >${subTask.description}</textarea>
              </div>
            </div>
          </div>`);
  });

  content.insertAdjacentHTML('beforeend', subTaskList.join(''));
}

export default initTaskView;
