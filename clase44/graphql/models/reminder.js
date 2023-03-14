class Reminder {
  constructor(id, { title, description }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.timestamp = new Date().toISOString();
    this.read = false;
  }
}

export default Reminder;
