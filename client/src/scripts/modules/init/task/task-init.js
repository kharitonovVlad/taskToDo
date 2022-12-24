import { taskService } from '../../services/task-service';
import { taskListeners } from '../event-listeners/task-listeners';
import { ModalService } from '../../services/modal-service';

function taskInit(index, content) {
  const task = taskService.getTask(index);
  const screenWidth = window.screen.width;

  if (screenWidth > 400) {
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
  } else {
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

              <div class="top-container">
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
              </div>
              <div class="middle-container">
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
              </div>
              <div class="bottom-container">
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
  }

  document.querySelector('#removeTaskButton').addEventListener('click', () => {
    ModalService.createRemoveConfirm({
      confirmCallback: () => {
        taskListeners.remove(index, task.id);
      },
      header: 'Подтвердите действие',
      message: 'Вы действительно хотите удалить задачу?',
    });
  });
  document.querySelector('#doneTaskButton').addEventListener('click', () => {
    taskListeners.done(index);
  });
  document.querySelector('#nameInput').addEventListener('change', (event) => {
    const { value } = event.target;
    taskListeners.updateTitle(index, value);
  });
  document
    .querySelector('#descriptionTextArea')
    .addEventListener('change', (event) => {
      const { value } = event.target;
      taskListeners.updateDescription(index, value);
    });
}

export default taskInit;
