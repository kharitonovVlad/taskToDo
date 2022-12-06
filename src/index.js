import './styles/style.scss';
import initView from './scripts/modules/init-view';
import { taskService } from './scripts/modules/services/task-service';

const tasks = taskService.getTasks();

if (tasks.length) {
  initView(tasks, 0);
}
