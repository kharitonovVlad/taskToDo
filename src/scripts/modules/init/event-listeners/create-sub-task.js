import SubTask from '../../../classes/SubTask';
import { subTaskService } from '../../services/sub-task-service';
import subTasksInit from '../sub-task/sub-tasks-init';

function createSubTask() {
  const createSubTaskInput = document.querySelector('#createSubTaskInput');
  const newSubTask = new SubTask(createSubTaskInput.value);

  createSubTaskInput.value = '';
  subTaskService.addSubTask(newSubTask);

  subTasksInit();
}

export default createSubTask;
