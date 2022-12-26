import SubTask from '../../../classes/SubTask';
import { subTaskService } from '../../services/sub-task-service';
import subTasksInit from '../sub-task/sub-tasks-init';

function createSubTask() {
  const createSubTaskInput = document.querySelector('#createSubTaskInput');
  const newSubTask = new SubTask(
    createSubTaskInput.value,
    subTaskService.getCurrentTaskId()
  );

  createSubTaskInput.value = '';
  subTaskService.addSubTask(newSubTask).then(() => {
    subTasksInit();
  });
}

export default createSubTask;
