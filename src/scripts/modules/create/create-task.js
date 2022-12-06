function createTask(task) {
  const taskContainer = document.createElement('div');
  taskContainer.classList.add('task');

  const taskHours = document.createElement('span');
  taskHours.classList.add('task--hours');
  taskHours.innerText = `${task.time}ч`;

  let taskName;
  let taskDescription;
  if (task.done) {
    taskName = document.createElement('span');
    taskName.classList.add('task-name');
    taskName.innerText = task.title;

    taskDescription = document.createElement('p');
    taskDescription.classList.add('task-description');
    taskDescription.innerText = task.description;
  } else {
    taskName = document.createElement('input');
    taskName.id = 'task-name-input';
    taskName.classList.add('task-name');
    taskName.value = task.title;

    taskDescription = document.createElement('textarea');
    taskDescription.id = 'task-description';
    taskDescription.classList.add('task-description');
    taskDescription.value = task.description;
  }

  const doneButton = document.createElement('button');
  doneButton.innerText = task.done ? 'Вернуть' : 'Готово';
  doneButton.id = 'done-task-btn';
  doneButton.classList.add('action-button');
  doneButton.classList.add('done-sub-task-button');

  const updateButton = document.createElement('button');
  updateButton.innerText = 'Редактировать';
  updateButton.id = 'update-task-btn';
  updateButton.classList.add('action-button');
  updateButton.classList.add('update-sub-task-button');

  const removeButton = document.createElement('button');
  removeButton.innerText = 'Удалить';
  removeButton.id = 'remove-task-btn';
  removeButton.classList.add('action-button');
  removeButton.classList.add('remove-sub-task-button');

  const taskActionsContainer = document.createElement('div');
  taskActionsContainer.classList.add('task-actions-container');
  taskActionsContainer.appendChild(doneButton);
  if (!task.done) {
    taskActionsContainer.appendChild(updateButton);
    taskActionsContainer.appendChild(removeButton);
  }

  const taskInfoContainer = document.createElement('div');
  taskInfoContainer.classList.add('task-info-container');
  taskInfoContainer.appendChild(taskHours);
  taskInfoContainer.appendChild(taskName);
  taskInfoContainer.appendChild(taskActionsContainer);

  const createSubInput = document.createElement('input');
  createSubInput.classList.add('create-sub-input');

  const createSubButton = document.createElement('button');
  createSubButton.innerText = 'Добавить';
  createSubButton.classList.add('create-sub-button');

  const createSubContainer = document.createElement('div');
  createSubContainer.classList.add('create-sub-container');
  createSubContainer.appendChild(createSubInput);
  createSubContainer.appendChild(createSubButton);

  taskContainer.appendChild(taskInfoContainer);
  taskContainer.appendChild(taskDescription);
  if (!task.done) {
    taskContainer.appendChild(createSubContainer);
  }

  return taskContainer;
}

export default createTask;
