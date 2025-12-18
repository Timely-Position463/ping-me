import express from "express";
import {  getAllContacts,  getChatPartners,  getMessagesByUserId,  sendMessage,} from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { arjectProtection } from "../middleware/arcject.middleware.js";

const router = express.Router();

//these are the middlewares which execute in order - so requests get rate-limited first and then authenticated.
//this is actually more efficient since unauthenticated requests get blocked by rate limiting before hitting the auth middleware.
router.use( protectRoute);
// router.use(arjectProtection, protectRoute);

router.get("/contacts", getAllContacts);
router.get("/chats", getChatPartners);
router.get("/:id", getMessagesByUserId);
router.post("/send/:id", sendMessage);

export default router;
