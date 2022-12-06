class SubTask {
  constructor(title, time, done, description) {
    this.title = title;
    this.time = time ? time : 0;
    this.done = done ? done : false;
    this.description = description ? description : '';
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
    if (time) {
      const indexOfSlice = time.indexOf('ч');
      if (indexOfSlice !== 0) {
        time =
          indexOfSlice !== -1 ? time.slice(0, indexOfSlice) : time.slice(0);
      } else {
        time = 0;
      }
    } else {
      time = 0;
    }
    this.time = time;
  }
}

export default SubTask;
