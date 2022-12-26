class SubTask {
  constructor(title, taskId, id, time, done, description) {
    this.title = title;
    this.time = time ? time : 0;
    this.done = done ? done : false;
    this.description = description ? description : '';
    this.id = id;
    this.taskId = taskId;
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

  setTime(time) {
    this.time = time;
  }
}

export default SubTask;
