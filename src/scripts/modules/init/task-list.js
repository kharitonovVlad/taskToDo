import initView from '../init-view';
import Task from '../../classes/Task';

function initTaskList(tasks, menu, activeTaskIndex) {
  menu.innerHTML = '';
  const tasksList = document.createElement('ul');
  tasksList.classList.add('tasks-list');
  menu.appendChild(tasksList);

  const createTaskRow = document.createElement('li');
  createTaskRow.classList.add('create-task');

  const createTaskInput = document.createElement('input');
  createTaskInput.classList.add('create-task-input');

  const createTaskButton = document.createElement('button');
  createTaskButton.innerText = 'Добавить';
  createTaskButton.classList.add('create-task-button');
  createTaskButton.id = 'create-task-btn';

  createTaskRow.appendChild(createTaskInput);
  createTaskRow.appendChild(createTaskButton);

  tasksList.appendChild(createTaskRow);

  createTaskButton.addEventListener('click', () => {
    if (createTaskInput.value) {
      const newTask = new Task(createTaskInput.value);
      tasks.unshift(newTask);

      initView(tasks, 0);
    }
  });

  tasks.forEach((task, index) => {
    task.time = task.subTasks.reduce((sum, current) => {
      return sum + current.time;
    }, 0);

    const newTask = document.createElement('li');
    newTask.classList.add('tasks-list--name');

    newTask.addEventListener('click', () => {
      initView(tasks, index);
    });

    if (index === activeTaskIndex) {
      newTask.classList.add('active');
    }

    newTask.innerText = task.title;
    tasksList.appendChild(newTask);
  });
}

export default initTaskList;
