console.log("✅ auth.js loaded");

const express = require('express');
const router = express.Router();

router.post('/register', (req, res) => {
  console.log("📩 Register endpoint hit");
  res.json({ message: 'Register route works' });
});

module.exports = router;
