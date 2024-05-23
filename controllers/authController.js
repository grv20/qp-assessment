const { User } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).send("Invalid credentials");
  }
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.send({ token });
};

const register = async (req, res) => {
  const { name, email, password, type } = req.body;
  if (!name || !email || !password || !type) {
    return res.status(400).send("All fields are required");
  }

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return res.status(400).send("User already exists");
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    type,
  });

  res
    .status(201)
    .send({ id: user.id, name: user.name, email: user.email, type: user.type });
};

module.exports = { login, register };
