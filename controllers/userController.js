const {userSchema} = require("../validation/userSchema");
const crypto = require("crypto");
const util = require("util");
const scrypt = util.promisify(crypto.scrypt);


async function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const derivedKey = await scrypt(password, salt, 64);
  return `${salt}:${derivedKey.toString("hex")}`;
}

async function comparePasswords(inputPassword, storeHash) {
  const [salt, key] = storeHash.split(":");
  const keyBuffer = Buffer.from(key, "hex");
  const derivedKey = await scrypt(inputPassword, salt, 64);
  return crypto.timingSafeEqual(keyBuffer, derivedKey);
}


async function register(req, res) {

  // Validation

  if (!req.body) {
    req.body = {};
  }

  const { error, value} = userSchema.validate(req.body, { abortEarly: false});

  if (error) return res.status(400).json({message: error.message});
 

  const hashedPassword = await hashPassword(value.password);

  const newUser = { email: value.email, name: value.name, hashedPassword };

  global.users.push(newUser);
  global.user_id = newUser;

  res.status(201).json({ name: value.name, email: value.email });
}




async function logon(req, res) {
  const { email, password } = req.body;


  const user = global.users.find((u) => u.email === email);

  if (!user) {
    res.status(401).json({ error: "No user found" });
    return;
  }


  const goodCredentials = user && await comparePasswords(password, user.hashedPassword)

  if (!goodCredentials) {
    return res.status(401).json({error: "Invalid Password"});
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
