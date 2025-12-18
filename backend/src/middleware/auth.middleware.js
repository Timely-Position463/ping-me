import { ENV } from "../lib/env.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken"

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies?.jwt;
    if (!token)
      return res
        .status(401)
        .json({ message: "Unauthorized - No Token Provided" });

    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    if (!decoded)
      return res.status(401).json({ message: "Unauthorized - Invalid token" });

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (error) {
    if(error.name==="JsonWebTokenError")return res.status(401).json({message:"Unauthorized-Invalid token"})
    if(error.name==="TokenExpiredError")return res.status(401).json({message:"Unauthorized - token expired"})
    console.error("Error in protectRoute middleware:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
