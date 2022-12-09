import initTaskView from '../task-view';

function setActive(index) {
  const taskItem = document.querySelector(`#taskItem-${index}`);
  const taskList = document.querySelector('#taskList');

  for (let task of taskList.children) {
    task.classList.remove('active');
  }
  taskItem.classList.add('active');
}

function onTaskClick(index) {
  setActive(index);
  initTaskView(index);
}

export default onTaskClick;
