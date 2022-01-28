const express = require('express');
const dotenv = require('dotenv');
const e = require('express');

const router = require('./routes/userRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();
const { PORT } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the support desk API' });
});

app.use('/api/users', router);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
