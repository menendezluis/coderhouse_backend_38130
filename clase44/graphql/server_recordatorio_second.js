import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import crypto from "crypto";

const schema = buildSchema(`
  type Reminder {
    id: ID!
    title: String
    description: String
    timestamp: String
    read: Boolean
  }

  input ReminderInput {
    title: String
    description: String
  }

  type Query {
    getReminder(id: ID!): Reminder
    getReminders: [Reminder]
  }

  type Mutation {
    createReminder(datos: ReminderInput!): Reminder
    markReminderAsRead(id: ID!): Reminder
    deleteReadReminders: [Reminder]
  }
`);

class Reminder {
  constructor(id, { title, description }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.timestamp = new Date().toISOString();

    this.read = false;
  }
}

const remindersMap = {};

function getReminders() {
  return Object.values(remindersMap);
}

function getReminder({ id }) {
  if (!remindersMap[id]) {
    throw new Error("Reminder not found.");
  }
  return remindersMap[id];
}

function createReminder({ datos }) {
  const id = crypto.randomBytes(10).toString("hex");
  const nuevoReminder = new Reminder(id, datos);
  remindersMap[id] = nuevoReminder;
  return nuevoReminder;
}

function markReminderAsRead({ id }) {
  if (!remindersMap[id]) {
    throw new Error("Reminder not found.");
  }
  remindersMap[id].read = true;
  return remindersMap[id];
}

function deleteReadReminders() {
  const deletedReminders = [];
  Object.values(remindersMap).forEach((reminder) => {
    if (reminder.read) {
      delete remindersMap[reminder.id];
      deletedReminders.push(reminder);
    }
  });
  return deletedReminders;
}

const app = express();

app.use(express.static("public"));

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: {
      getReminders,
      getReminder,
      createReminder,
      markReminderAsRead,
      deleteReadReminders,
    },
    graphiql: true,
  })
);

const PORT = 8080;
app.listen(PORT, () => {
  const msg = `Servidor corriendo en puerto ${PORT}`;
  console.log(msg);
});
