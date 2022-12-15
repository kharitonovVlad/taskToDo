import subTasksInit from './sub-task/sub-tasks-init';
import taskInit from './task/task-init';
import createSubTaskInit from './sub-task/create-sub-task-init';

function initTaskView(index) {
  const content = document.querySelector('.content');
  content.innerHTML = '';

  taskInit(index, content);
  createSubTaskInit(content);
  subTasksInit(index);
}

export default initTaskView;
