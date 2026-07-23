function register(req, res) {
  const { name, email, password } = req.body;

  const newUser = { name, email, password };
  global.users.push(newUser);
  global.user_id = newUser;

  res.status(201).json({ name, email });
}

function logon(req, res) {
  const { email, password } = req.body;
  const user = global.users.find(
    (u) => u.email === email && u.password === password,
  );

  if (!user) {
    res.status(401).json({ error: "Invalid email or password" });
    return;
  }

  global.user_id = user;
  res.status(200).json({ name: user.name, email: user.email });
}

function logoff(req, res) {
  global.user_id = null;
  res.sendStatus(200);
}

module.exports = {
  register,
  logon,
  logoff,
};
