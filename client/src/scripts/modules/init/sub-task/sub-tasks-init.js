import { subTaskService } from '../../services/sub-task-service';
import { subTaskListeners } from '../event-listeners/sub-task-listeners';
import { taskService } from '../../services/task-service';
import { ModalService } from '../../services/modal-service';
import emptyListTemplate from '../../templates/empty-list-template';

function subTasksInit(index = null) {
  const subTasks = subTaskService.getSubTasks(index);
  const currentTask = taskService.getTask(subTaskService.getCurrentTaskIndex());
  subTaskService.setCurrentTaskId(currentTask.id);
  const subTasksContainer = document.querySelector('#subTasksContainer');
  subTasksContainer.innerHTML = '';
  const subTaskList = [];
  if (subTasks.length) {
    subTasks.forEach((subTask, index) => {
      const screenWidth = window.screen.width;

      if (screenWidth > 400) {
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
              } id="removeSubTaskButton-${index}">
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
                  id="hoursInput-${index}"
                  placeholder="ч"
                  value="${subTask.time}"
                  ${!subTask.done ? '' : 'disabled'}
                />
                <label for="hoursInput-${index}">Время</label>
              </div>
              <div class="form-floating">
                <input
                  type="text"
                  class="form-control"
                  id="subNameInput-${index}"
                  placeholder="Имя подзадачи"
                  value="${subTask.title}"
                />
                <label for="subNameInput-${index}">Имя подзадачи</label>
              </div>
              <button class="btn btn-outline-success done" type="button" id="doneSubTaskButton-${index}" ${
          currentTask.done ? 'disabled' : ''
        }>
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
                  id="descriptionSubTaskTextArea-${index}"
                >${subTask.description}</textarea>
              </div>
            </div>
          </div>`);
      } else {
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
              <div class="top-container">
                <div class="form-floating">
                  <input
                    type="text"
                    class="form-control"
                    id="subNameInput-${index}"
                    placeholder="Имя подзадачи"
                    value="${subTask.title}"
                  />
                  <label for="subNameInput-${index}">Имя подзадачи</label>
                </div>
              </div>
              <div class="middle-container">
                <div class="form-floating hours">
                  <input
                    type="text"
                    class="form-control"
                    id="hoursInput-${index}"
                    placeholder="ч"
                    value="${subTask.time}"
                    ${!subTask.done ? '' : 'disabled'}
                  />
                  <label for="hoursInput-${index}">Время</label>
                </div>
              </div>
              <div class="bottom-container">
                <button class="btn btn-outline-danger remove-button" type="button" ${
                  !subTask.done ? '' : 'disabled'
                } id="removeSubTaskButton-${index}">
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
  
                <button class="btn btn-outline-success done" type="button" id="doneSubTaskButton-${index}" ${
          currentTask.done ? 'disabled' : ''
        }>
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
                      id="descriptionSubTaskTextArea-${index}"
                    >${subTask.description}</textarea>
                  </div>
                </div>
          </div></div>`);
      }
    });

    subTasksContainer.insertAdjacentHTML('afterbegin', `<h4>Подзадачи</h4>`);
    subTasksContainer.insertAdjacentHTML('beforeend', subTaskList.join(''));

    subTasks.forEach((subTask, index) => {
      document
        .querySelector(`#removeSubTaskButton-${index}`)
        .addEventListener('click', () => {
          ModalService.createRemoveConfirm({
            confirmCallback: () => {
              subTaskListeners.remove(index);
            },
            header: 'Подтвердите действие',
            message: 'Вы действительно хотите удалить подзадачу?',
          });
        });
      document
        .querySelector(`#doneSubTaskButton-${index}`)
        .addEventListener('click', () => {
          subTaskListeners.done(index);
        });

      document
        .querySelector(`#hoursInput-${index}`)
        .addEventListener('change', (event) => {
          subTaskListeners.updateHours(index, event.target['value']);
        });
      document
        .querySelector(`#subNameInput-${index}`)
        .addEventListener('change', (event) => {
          subTaskListeners.updateTitle(index, event.target['value']);
        });
      document
        .querySelector(`#descriptionSubTaskTextArea-${index}`)
        .addEventListener('change', (event) => {
          subTaskListeners.updateDescription(index, event.target['value']);
        });
    });
  } else {
    subTasksContainer.insertAdjacentHTML(
      'afterbegin',
      emptyListTemplate('Список подзадач пуст', 10)
    );
  }
}

export default subTasksInit;
