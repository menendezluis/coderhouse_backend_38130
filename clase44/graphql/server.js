import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import mongoose from "mongoose";
//import dotenv from "dotenv";
import cors from "cors";
import Reminder from "./models/reminder.js";
import reminderController from "./controllers/reminderController.js";
import reminderRoutes from "./routes/reminderRoutes.js";
//
//dotenv.config();
const MONGO_URL = "mongodb://127.0.0.1:27017/clase38130";
const PORT = 8080;

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

const rootValue = {
  getReminders: reminderController.getReminders,
  createReminder: reminderController.createReminder,
  markReminderAsRead: reminderController.markReminderAsRead,
  deleteReadReminders: reminderController.deleteReadReminders,
};

const app = express();
app.use(cors());
app.use(express.json());

app.use("/graphql", graphqlHTTP({ schema, rootValue, graphiql: true }));

app.use("/api", reminderRoutes);

/*mongoose
  .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to database");
   
  })
  .catch((error) => console.error(error));

  */

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
