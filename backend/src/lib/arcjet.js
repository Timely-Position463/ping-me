import arcjet, { shield, detectBot, slidingWindow } from "@arcjet/node";
import { ENV } from "./env.js";

const aj = arcjet({
  key: ENV.ARCJECT_KEY,
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: process.env.NODE_ENV === "production" ? "LIVE" : "DRY_RUN",
      allow: ["CATEGORY:SEARCH_ENGINE"],
    }),
    slidingWindow({
      mode: "LIVE",
      max: 200,
      interval: 60,
    }),
  ],
});

export default aj;
