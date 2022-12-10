import initTaskList from './init/task-list';
import initTaskView from './init/task-view';
import { taskService } from './services/task-service';

function initView(taskIndex) {
  const tasks = taskService.getTasks();

  initTaskList(tasks, taskIndex);

  tasks.forEach((task, index) => {
    if (index === taskIndex) {
      initTaskView(index);
    }
  });
}

export default initView;
