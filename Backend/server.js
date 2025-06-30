require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/auth');
const coursesRoutes = require('./routes/courses');
const questionsRoutes = require('./routes/questions');
const examRoutes = require('./routes/exam');
const { verifyToken } = require('./middleware/auth');

app.use(express.json());
app.use(cors());
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});
app.use('/api/auth', authRoutes);
app.use('/api/courses', verifyToken, coursesRoutes);
app.use('/api/questions', verifyToken, questionsRoutes);
app.use('/api/exam', verifyToken, examRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
