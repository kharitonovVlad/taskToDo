import initTaskList from './init/task-list';
import initTaskView from './init/task-view';

function initView(tasks, activeTaskIndex) {
  const menu = document.querySelector('.menu');
  const content = document.querySelector('.content');

  initTaskList(tasks, menu, activeTaskIndex);

  tasks.forEach((task, index) => {
    if (index === activeTaskIndex) {
      initTaskView(tasks[index], content, tasks, index);
    }
  });
}

export default initView;
