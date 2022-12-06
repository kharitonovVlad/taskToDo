class Task {
  constructor(title, subTasks, time, done, desc) {
    this.title = title;
    this.subTasks = subTasks ? subTasks : [];
    this.time = time ? time : null;
    this.done = done ? done : false;
    this.description = desc ? desc : '';
  }

  setTitle(title) {
    this.title = title;
  }

  setDone(isDone) {
    this.done = isDone;
  }

  setDesc(desc) {
    this.description = desc;
  }

  addSubTask(subTask) {
    this.subTasks.push(subTask);
  }

  removeSubTask(subTask) {
    this.subTasks = this.subTasks.filter((sub) => sub.title !== subTask.title);
  }

  setTime(time) {
    this.time = time;
  }
}

export default Task;
