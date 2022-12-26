import { subTaskService } from '../../services/sub-task-service';
import subTasksInit from '../sub-task/sub-tasks-init';
import initView from '../../init-view';

export const subTaskListeners = {
  remove: (index) => {
    subTaskService.removeSubTask(index).then(() => {
      subTasksInit();
    });
  },
  done: (index) => {
    const subTask = subTaskService.getSubTask(index);

    subTask.setDone(!subTask.done);
    subTaskService.updateSubTask(index, subTask).then(() => {
      initView(subTaskService.getCurrentTaskIndex());
    });
  },
  updateTitle: (index, newTitle) => {
    const subTask = subTaskService.getSubTask(index);

    subTask.setTitle(newTitle);
    subTaskService.updateSubTask(index, subTask);
  },
  updateDescription: (index, newDesc) => {
    const subTask = subTaskService.getSubTask(index);

    subTask.setDesc(newDesc);
    subTaskService.updateSubTask(index, subTask);
  },
  updateHours: (index, newHours) => {
    const subTask = subTaskService.getSubTask(index);

    subTask.setTime(newHours);
    subTaskService.updateSubTask(index, subTask).then(() => {
      initView(subTaskService.getCurrentTaskIndex());
    });
  },
};
