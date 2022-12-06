import initTaskView from '../task-view';

export const subTaskListeners = {
  addClickListenerToRemoveSubTaskButton: (
    task,
    subTaskId,
    content,
    tasks,
    taskIndex
  ) => {
    const removeButton = document.querySelector(`#remove-sub-btn-${subTaskId}`);
    removeButton.addEventListener('click', () => {
      task.subTasks = task.subTasks.filter((task, index) => {
        return index !== subTaskId;
      });

      initTaskView(task, content, tasks, taskIndex);
    });
  },
  addClickListenerToUpdateSubTaskButton: (
    task,
    subTaskId,
    content,
    tasks,
    taskIndex
  ) => {
    const updateButton = document.querySelector(`#update-sub-btn-${subTaskId}`);
    updateButton.addEventListener('click', () => {
      const subTask = document.querySelector(`#sub-task-${subTaskId}`);
      const subHours = document.querySelector(`#sub-hours-${subTaskId}`);
      const subDescription = document.querySelector(`#sub-desc-${subTaskId}`);
      task.subTasks.forEach((sub, index) => {
        if (index === subTaskId) {
          sub.setTitle(subTask.value);
          sub.setTime(subHours.value);
          sub.setDesc(subDescription.value);
        }
      });

      initTaskView(task, content, tasks, taskIndex);
    });
  },
  addClickListenerToDoneSubTaskButton: (
    task,
    subTaskId,
    content,
    tasks,
    taskIndex
  ) => {
    const doneButton = document.querySelector(`#done-sub-btn-${subTaskId}`);
    doneButton.addEventListener('click', () => {
      task.subTasks.forEach((sub, index) => {
        if (index === subTaskId) {
          sub.setDone(!sub.done);
        }
      });
      initTaskView(task, content, tasks, taskIndex);
    });
  },
};
