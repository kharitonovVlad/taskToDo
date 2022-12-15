export const idService = {
  setForTasks: () => {
    const taskList = document.querySelector('#taskList').children;
    for (let i = 0; i < taskList.length; i++) {
      taskList[i].id = `taskItem-${i}`;
    }
  },
};
