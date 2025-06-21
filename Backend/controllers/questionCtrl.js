const pool = require('../db');

async function getQuestions(req, res) {
  const { courseId } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = 5;
  const offset = (page - 1) * limit;

  const { rows: questions } = await pool.query(
    `SELECT id, question_text, options
     FROM questions
     WHERE course_id = $1
     ORDER BY id
     LIMIT $2 OFFSET $3`, [courseId, limit, offset]);

  const { rows } = await pool.query('SELECT COUNT(*) FROM questions WHERE course_id=$1', [courseId]);
  const total = Math.ceil(parseInt(rows[0].count) / limit);

  res.json({ questions, totalPages: total });
}

module.exports = { getQuestions };
