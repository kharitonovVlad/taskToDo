import { taskService } from '../services/task-service';
import createTask from '../create/create-task';
import createSubTask from '../create/create-sub-task';
import { taskListeners } from './event-listeners/task-listeners';
import { subTaskListeners } from './event-listeners/sub-task-listeners';

function initTaskView(task, content, tasks, taskIndex) {
  content.innerHTML = '';

  task.time = task.subTasks.reduce((sum, current) => {
    return sum + (current.done ? 0 : +current.time);
  }, 0);

  const taskContainer = createTask(task);

  if (task.subTasks.length) {
    const subTasksList = document.createElement('ul');
    subTasksList.classList.add('sub-tasks-list');

    task.subTasks.forEach((sub, subIndex) => {
      const subItem = createSubTask(sub, subIndex);
      subTasksList.appendChild(subItem);
    });

    taskContainer.appendChild(subTasksList);
  }

  content.appendChild(taskContainer);

  if (!task.done) {
    taskListeners.addClickListenerToRemoveTaskButton(
      task,
      content,
      tasks,
      taskIndex
    );
    taskListeners.addClickListenerToUpdateTaskButton(
      task,
      content,
      tasks,
      taskIndex
    );

    taskListeners.addClickListenerToCreateSubButton(tasks, content, taskIndex);
  }
  taskListeners.addClickListenerToDoneTaskButton(
    task,
    content,
    tasks,
    taskIndex
  );

  task.subTasks.forEach((sub, subIndex) => {
    if (!sub.done) {
      subTaskListeners.addClickListenerToRemoveSubTaskButton(
        task,
        subIndex,
        content,
        tasks,
        taskIndex
      );
      subTaskListeners.addClickListenerToUpdateSubTaskButton(
        task,
        subIndex,
        content,
        tasks,
        taskIndex
      );
    }
    subTaskListeners.addClickListenerToDoneSubTaskButton(
      task,
      subIndex,
      content,
      tasks,
      taskIndex
    );
  });

  taskService.saveTasks(tasks);
}

export default initTaskView;
