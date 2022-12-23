import initTaskList from './init/task-list';
import initTaskView from './init/task-view';
import { taskService } from './services/task-service';
import emptyListTemplate from './templates/empty-list-template';

async function initView(taskIndex) {
  const content = document.querySelector('.content');
  content.innerHTML = '';

  const tasks = await taskService.getTasks();

  initTaskList(tasks, taskIndex);

  if (tasks.length) {
    tasks.forEach((task, index) => {
      if (index === taskIndex) {
        initTaskView(index);
      }
    });
  } else {
    content.insertAdjacentHTML(
      'afterbegin',
      emptyListTemplate('Список задач пуст', 30)
    );
  }
}

export default initView;
