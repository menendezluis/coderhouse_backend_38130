import { Router } from "express";

const router = Router();
import reminderController from "../controllers/reminderController.js";

router.get("/reminders", reminderController.getReminders);

router.get("/reminder/:id", reminderController.getReminder);

router.post("/reminder", reminderController.createReminder);

router.put("/reminder/:id", reminderController.markReminderAsRead);

router.delete("/reminders", reminderController.deleteReadReminders);

export default router;
