const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

// TEMP login (hackathon-safe)
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // simple validation (for demo)
  if (!email || !password) {
    return res.status(400).json({ message: "Missing credentials" });
  }

  // generate token
  const token = jwt.sign(
    { email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
});

module.exports = router;
