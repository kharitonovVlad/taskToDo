import createSubTask from '../event-listeners/create-sub-task';

function createSubTaskInit(content) {
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
}

export default createSubTaskInit;
