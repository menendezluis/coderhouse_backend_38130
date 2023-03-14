import crypto from "crypto";
import Reminder from "../models/reminder.js";

const remindersMap = {};

const ReminderController = {
  getReminders: () => {
    return Object.values(remindersMap);
  },

  getReminder: ({ id }) => {
    if (!remindersMap[id]) {
      throw new Error("Reminder not found.");
    }
    return remindersMap[id];
  },

  createReminder: ({ datos }) => {
    const id = crypto.randomBytes(10).toString("hex");
    const nuevoReminder = new Reminder(id, datos);
    remindersMap[id] = nuevoReminder;
    return nuevoReminder;
  },

  markReminderAsRead: ({ id }) => {
    if (!remindersMap[id]) {
      throw new Error("Reminder not found.");
    }
    remindersMap[id].read = true;
    return remindersMap[id];
  },
  deleteReadReminders: () => {
    const deletedReminders = [];
    Object.values(remindersMap).forEach((reminder) => {
      if (reminder.read) {
        delete remindersMap[reminder.id];
        deletedReminders.push(reminder);
      }
    });
    return deletedReminders;
  },
};

export default ReminderController;
