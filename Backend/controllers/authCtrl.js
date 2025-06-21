const pool = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res)=> {
  console.log(req.body);
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  await pool.query('INSERT INTO users(name, email, password) VALUES ($1,$2,$3)', [name,email,hashed]);
  res.json({ msg: 'User created' });
}

exports.login = async (req, res) =>{
  const { email, password } = req.body;
  const { rows } = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
  if (!rows[0]) return res.status(400).json({ msg: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, rows[0].password);
  if (!valid) return res.status(400).json({ msg: 'Invalid credentials' });

  const token = jwt.sign({ id: rows[0].id, email }, process.env.JWT_SECRET, { expiresIn: '12h' });
  res.json({ token });
}

