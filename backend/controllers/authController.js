// backend/controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    if (await User.findOne({ email })) {
      return res.status(400).json({ message: 'Email exists' });
    }

    const user = new User({ name, email, password });
    await user.save();

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Initialize debug info
    let debugInfo = {
      timestamp: new Date().toISOString(),
      emailSent: email,
      passwordSent: password, // Only for debugging; remove in production!
      userFound: false,
      bcryptResult: null,
      reason: null
    };

    console.log(`Login attempt: ${email}`);

    const user = await User.findOne({ email });
    if (!user) {
      debugInfo.reason = "No user found";
      console.warn(`Login failed for ${email}: No user found`);
      return res.status(401).json({ message: 'Invalid credentials', debug: debugInfo });
    }

    debugInfo.userFound = true;

    const ok = await user.comparePassword(password);
    debugInfo.bcryptResult = ok;

    if (!ok) {
      debugInfo.reason = "Password mismatch";
      console.warn(`Login failed for ${email}: Password mismatch`);
      return res.status(401).json({ message: 'Invalid credentials', debug: debugInfo });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    debugInfo.reason = "Success";
    console.log(`Login successful for ${email}`);

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
      debug: debugInfo
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({
      message: err.message,
      debugError: err.stack
    });
  }
};

// // backend/controllers/authController.js
// const User = require('../models/User');
// const jwt = require('jsonwebtoken');

// exports.register = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });
//     if (await User.findOne({ email })) return res.status(400).json({ message: 'Email exists' });
//     const user = new User({ name, email, password });
//     await user.save();
//     const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
//     res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });

//     // Collect debug info
//     let debugInfo = {
//       emailSent: email,
//       passwordSent: password,
//       userFound: !!user,
//       hashedPassword: user ? user.password : null,
//       bcryptResult: null
//     };

//     if (!user) {
//       return res.status(401).json({
//         message: 'Invalid credentials',
//         debug: debugInfo
//       });
//     }

//     const ok = await user.comparePassword(password);
//     debugInfo.bcryptResult = ok;

//     if (!ok) {
//       return res.status(401).json({
//         message: 'Invalid credentials',
//         debug: debugInfo
//       });
//     }

//     const token = jwt.sign(
//       { id: user._id, email: user.email },
//       process.env.JWT_SECRET,
//       { expiresIn: '7d' }
//     );

//     res.json({
//       token,
//       user: { id: user._id, name: user.name, email: user.email },
//       debug: debugInfo
//     });

//   } catch (err) {
//     res.status(500).json({
//       message: err.message,
//       debugError: err.stack
//     });
//   }
// };


// // exports.login = async (req, res) => {
// //   try {
// //     const { email, password } = req.body;
// //     const user = await User.findOne({ email });
// //     if (!user) return res.status(401).json({ message: 'Invalid credentials' });
// //     const ok = await user.comparePassword(password);

// //     console.log("Password from request:", password);
// //     console.log("Password from DB:", user.password);
// //     console.log("Compare result:", await user.comparePassword(password));


// //     if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
// //     const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
// //     res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };
