import aj from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

export const arjectProtection = async (req, res,next) => {
  try {
    const decision = await aj.protect(req);
    if (decision.isDenied) {
      if (decision.reason.isRateLimit()) {
        return res
          .status(429)
          .json({ message: "Rate limit exceeded. Please try again later" });
      } else if (decision.reason.isBot()) {
        return res.status(403).json({ message: "Bot access denied" });
      } else {
        return res
          .status(403)
          .json({ message: "Access denied by security policy" });
      }
    }

    //check for spoofBot (which acts like human to get access)
    if (decision.results.some(isSpoofedBot)) {
      return res.status(403).json({
        error: "SpoofedBot detected",
        message: "Malicious Bot activity detected.",
      });
    }
    //if everything is fine
    next();
  } catch (error) {
    console.error("Arcjet Protection Error", error);
    next();
  }
};
