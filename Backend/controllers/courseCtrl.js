const pool = require('../db');

exports.getCourses = async (req, res) => {
  const { rows } = await pool.query('SELECT id,name FROM courses');
  res.json({ courses: rows });
}
