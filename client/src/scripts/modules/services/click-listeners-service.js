import onTaskClick from '../init/event-listeners/task-click';

export const clickListenersService = {
  setForTasks: () => {
    const taskList = document.querySelector('#taskList').children;
    for (let i = 0; i < taskList.length; i++) {
      document.querySelector(`#taskItem-${i}`).addEventListener('click', () => {
        onTaskClick(i);
      });
    }
  },
};
