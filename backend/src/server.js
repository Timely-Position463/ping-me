import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messageRouter from "./routes/message.route.js";
import path from "path";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();
const __dirname = path.resolve();

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRouter);

//make ready for deployment
if (!process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}
app.listen(PORT, () => console.log("Server running at port", PORT));
