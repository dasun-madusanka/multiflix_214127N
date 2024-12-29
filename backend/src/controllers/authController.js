const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../services/firebaseService");

exports.register = async (req, res) => {
  const { name, username, password, gender, email } = req.body;

  if (!name || !username || !password || !gender || !email) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const snapshot = await db
      .ref("users")
      .orderByChild("username")
      .equalTo(username)
      .once("value");
    if (snapshot.exists()) {
      return res.status(400).json({ message: "Username already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      name,
      username,
      password: hashedPassword,
      gender,
      email,
    };

    const ref = db.ref("users").push();
    await ref.set(newUser);

    return res
      .status(201)
      .json({ message: "User registered successfully.", user: newUser });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const snapshot = await db
      .ref("users")
      .orderByChild("username")
      .equalTo(username)
      .once("value");

    if (!snapshot.exists()) {
      return res.status(400).json({ message: "Invalid username or password." });
    }

    const user = Object.values(snapshot.val())[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password." });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ message: "Login successful.", token, user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }
};
