import express from "express"

const router = express.Router()

router.get("/login",(req, res)=> {
  res.send("Login endpoint")
})

export default router;