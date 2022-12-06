function createSubTask(subTask, subTaskId) {
  const subItem = document.createElement('li');
  subItem.classList.add('sub-task-item');

  let subHours;
  let subLabel;
  let subTaskDescription;
  if (subTask.done) {
    subHours = document.createElement('span');
    subHours.classList.add('sub-task--hours');
    subHours.innerText = `${subTask.time}ч`;

    subLabel = document.createElement('span');
    subLabel.classList.add('sub-task');
    subLabel.classList.add('done');
    subLabel.innerText = subTask.title;

    subTaskDescription = document.createElement('p');
    subTaskDescription.classList.add('sub-task-description');
    subTaskDescription.innerText = subTask.description;
  } else {
    subHours = document.createElement('input');
    subHours.classList.add('sub-task--hours');
    subHours.id = `sub-hours-${subTaskId}`;
    subHours.value = `${subTask.time}ч`;

    subLabel = document.createElement('input');
    subLabel.classList.add('sub-task');
    subLabel.id = `sub-task-${subTaskId}`;
    subLabel.value = subTask.title;

    subTaskDescription = document.createElement('textarea');
    subTaskDescription.id = `sub-desc-${subTaskId}`;
    subTaskDescription.classList.add('sub-task-description');
    subTaskDescription.value = subTask.description;
  }

  const doneButton = document.createElement('button');
  doneButton.innerText = subTask.done ? 'Вернуть' : 'Готово';
  doneButton.id = `done-sub-btn-${subTaskId}`;
  doneButton.classList.add('action-button');
  doneButton.classList.add('done-sub-task-button');

  const updateButton = document.createElement('button');
  updateButton.innerText = 'Редактировать';
  updateButton.id = `update-sub-btn-${subTaskId}`;
  updateButton.classList.add('action-button');
  updateButton.classList.add('update-sub-task-button');

  const removeButton = document.createElement('button');
  removeButton.innerText = 'Удалить';
  removeButton.id = `remove-sub-btn-${subTaskId}`;
  removeButton.classList.add('action-button');
  removeButton.classList.add('remove-sub-task-button');

  const mainInfoSubTaskContainer = document.createElement('div');
  mainInfoSubTaskContainer.classList.add('main-sub-task-container');

  const actionsContainer = document.createElement('div');
  actionsContainer.classList.add('sub-task-actions-container');
  actionsContainer.appendChild(doneButton);
  if (!subTask.done) {
    actionsContainer.appendChild(updateButton);
    actionsContainer.appendChild(removeButton);
  }

  mainInfoSubTaskContainer.appendChild(subHours);
  mainInfoSubTaskContainer.appendChild(subLabel);
  mainInfoSubTaskContainer.appendChild(actionsContainer);

  subItem.appendChild(mainInfoSubTaskContainer);
  subItem.appendChild(subTaskDescription);

  return subItem;
}

export default createSubTask;
