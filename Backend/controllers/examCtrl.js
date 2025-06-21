const pool = require('../db');

async function submitAnswers(req, res) {
  const { answers } = req.body;
  const candidateId = req.user.id;

  try {
    for (const answer of answers) {
      const { questionId, selectedOption } = answer;

      const qRes = await pool.query(
        'SELECT correct_option FROM questions WHERE id = $1',
        [questionId]
      );

      const correctOption = qRes.rows[0].correct_option;
      const isCorrect = selectedOption === correctOption;

      await pool.query(
        `INSERT INTO answers(user_id, question_id, selected_option, is_correct)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (user_id, question_id) DO UPDATE
         SET selected_option = $3, is_correct = $4`,
        [candidateId, questionId, selectedOption, isCorrect]
      );
    }

    res.json({ message: 'Answers recorded successfully' });
  } catch (error) {
    console.error('Error submitting answers:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


async function submitExam(req, res) {
  const {courseId } = req.body;
const candidateId=req.user.id;
  const result = await pool.query(`
    SELECT COUNT(*) AS score
    FROM answers a
    JOIN questions q ON a.question_id = q.id
    WHERE a.user_id = $1 AND q.course_id = $2 AND a.is_correct = true
  `, [candidateId, courseId]);

  const score = parseInt(result.rows[0].score);

  await pool.query(`
    INSERT INTO exam_results(user_id, course_id, score, attempted_on)
    VALUES ($1, $2, $3, NOW())
  `, [candidateId, courseId, score]);

  res.json({ score });
}

async function getResult(req, res) {
  const { courseId } = req.params;
  const { rows } = await pool.query(
    `SELECT score FROM exam_results
     WHERE user_id=$1 AND course_id=$2
     ORDER BY attempted_on DESC LIMIT 1`,
    [req.user.id, courseId]
  );
  if (!rows.length) return res.status(404).json({ msg: 'No result found' });
  res.json({ score: rows[0].score });
}

module.exports = { submitAnswers, getResult, submitExam };
