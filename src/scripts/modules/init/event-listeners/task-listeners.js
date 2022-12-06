import SubTask from '../../../classes/SubTask';
import initView from '../../init-view';
import initTaskView from '../task-view';

export const taskListeners = {
  addClickListenerToCreateSubButton: (tasks, content, taskIndex) => {
    const createSubButton = document.querySelector('.create-sub-button');
    createSubButton.addEventListener('click', () => {
      const createSubInput = document.querySelector('.create-sub-input');

      const newSubTask = new SubTask(createSubInput.value);

      const activeTask = tasks.find((task, index) => {
        return index === taskIndex;
      });

      activeTask.subTasks.push(newSubTask);
      initTaskView(activeTask, content, tasks, taskIndex);
    });
  },
  addClickListenerToRemoveTaskButton: (task, content, tasks, taskIndex) => {
    const removeButton = document.querySelector('#remove-task-btn');
    removeButton.addEventListener('click', () => {
      tasks = tasks.filter((currentTask, idx) => {
        return idx !== taskIndex;
      });

      initView(tasks, taskIndex);
    });
  },
  addClickListenerToUpdateTaskButton: (task, content, tasks, taskIndex) => {
    const updateButton = document.querySelector('#update-task-btn');
    updateButton.addEventListener('click', () => {
      const taskName = document.querySelector('#task-name-input');
      const taskDescription = document.querySelector('#task-description');

      task.setTitle(taskName.value);
      task.setDesc(taskDescription.value);

      initView(tasks, taskIndex);
    });
  },
  addClickListenerToDoneTaskButton: (task, content, tasks, taskIndex) => {
    const doneButton = document.querySelector('#done-task-btn');
    doneButton.addEventListener('click', () => {
      task.setDone(!task.done);

      task.subTasks.forEach((sub) => {
        sub.setDone(task.done);
      });

      initView(tasks, taskIndex);
    });
  },
};
