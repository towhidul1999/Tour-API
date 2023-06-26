const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const users = [];

async function registerUser(req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: "Name, email, and password are required" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = { name, email, password: hashedPassword };
  users.push(user);

  res.status(201).json(user);
}

async function userLogin(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const user = users.find((u) => u.email === email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const token = jwt.sign({ email }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });

  res.json({ token });
}

async function userProfile(req, res) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Authorization header is required" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const email = decodedToken.email;
    const user = users.find((u) => u.email === email);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = {
  registerUser,
  userLogin,
  userProfile,
};
