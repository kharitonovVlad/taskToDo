class Task {
  constructor(id, title, subTasks, time, done, desc) {
    this.id = id;
    this.title = title;
    this.subTasks = subTasks ? subTasks : [];
    this.time = time ? time : 0;
    this.done = done ? done : false;
    this.description = desc ? desc : '';
  }

  setTitle(title) {
    this.title = title;
  }

  setDone(isDone) {
    if (isDone) {
      this.subTasks.forEach((subTask) => {
        subTask.setDone(isDone);
      });
    }

    this.done = isDone;
  }

  setDesc(desc) {
    this.description = desc;
  }

  setTime(time) {
    this.time = time;
  }
}

export default Task;
