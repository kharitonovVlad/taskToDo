import initTaskList from './init/task-list';
import initTaskView from './init/task-view';
import { taskService } from './services/task-service';

function initView() {
  const tasks = taskService.getTasks();

  initTaskList(tasks);

  tasks.forEach((task, index) => {
    if (index === 0) {
      initTaskView(index);
    }
  });
}

export default initView;
