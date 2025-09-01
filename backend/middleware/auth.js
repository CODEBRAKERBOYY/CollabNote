// backend/middleware/auth.js
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const header = req.headers.authorization;

  // Debugging: show what we get
  // console.log("👉 Authorization Header:", header);

  if (!header) {
    return res.status(401).json({ message: "No token" });
  }

  // Expect: "Bearer <token>"
  const token = header.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    // ✅ Always use same secret as authController.js
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET || "defaultsecret"
    );

    // Attach user info to request
    req.user = { id: payload.id, email: payload.email };

    next();
  } catch (e) {
    console.error("👉 JWT Verification Failed:", e.message); // Debug
    return res.status(401).json({ message: "Invalid token" });
  }
};
