import { subTaskService } from '../../services/sub-task-service';

function subTasksInit(index = null) {
  const subTasks = subTaskService.getSubTasks(index);
  const subTasksContainer = document.querySelector('#subTasksContainer');
  subTasksContainer.innerHTML = '';
  const subTaskList = [];
  subTasks.forEach((subTask, index) => {
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

  subTasksContainer.insertAdjacentHTML('afterbegin', `<h4>Подзадачи</h4>`);
  subTasksContainer.insertAdjacentHTML('beforeend', subTaskList.join(''));
}

export default subTasksInit;
