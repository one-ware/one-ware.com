import { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import fs from "fs";
import path from "path";
import { RegistrationRequest, EventsConfig } from "../types";
import { addRegistration, getExcelFilePath } from "../services/excel";
import { sendRegistrationEmail } from "../services/email";

const router = Router();

const sanitize = (str: string): string => {
  return str.replace(/[<>]/g, "").trim().slice(0, 500);
};

const registerValidation = [
  body("eventId").isString().notEmpty().isLength({ max: 100 }),
  body("eventTitle").isString().notEmpty().isLength({ max: 200 }),
  body("name").isString().notEmpty().isLength({ max: 100 }),
  body("email").isEmail().normalizeEmail(),
  body("website").optional().isString(),
  body("fields").optional().isObject(),
];

const eventsConfig: EventsConfig = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../config/events.json"), "utf-8")
);

router.post("/register", registerValidation, async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: "Invalid input" });
    }

    const { eventId, eventTitle, name, email, website, fields }: RegistrationRequest = req.body;

    if (website && website.trim() !== "") {
      return res.status(200).json({ success: true });
    }

    const cleanName = sanitize(name);
    const cleanTitle = sanitize(eventTitle);

    const eventConfig = eventsConfig[eventId];
    if (!eventConfig) {
      return res.status(404).json({ error: "Event not found" });
    }

    const timestamp = new Date().toISOString();

    await addRegistration(eventId, {
      name: cleanName,
      email,
      fields: fields || {},
      timestamp,
    });

    await sendRegistrationEmail({
      to: email,
      name: cleanName,
      eventTitle: cleanTitle,
      meetingLink: eventConfig.link,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/download", async (req: Request, res: Response) => {
  try {
    const { key } = req.query;

    if (key !== process.env.DOWNLOAD_API_KEY) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const filePath = getExcelFilePath();

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "No registrations found" });
    }

    res.download(filePath, "registrations.xlsx");
  } catch (error) {
    console.error("Download error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
