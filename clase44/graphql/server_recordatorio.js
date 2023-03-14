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
  }
`);

class Reminder {
  constructor(id, { title, description }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.timestamp = new Date().toISOString();
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

const app = express();

app.use(express.static("public"));

app.use(
  "/holamundo",
  graphqlHTTP({
    schema: schema,
    rootValue: {
      getReminders,
      getReminder,
      createReminder,
    },
    graphiql: true,
  })
);

const PORT = 8080;
app.listen(PORT, () => {
  const msg = `Servidor corriendo en puerto ${PORT}`;
  console.log(msg);
});
