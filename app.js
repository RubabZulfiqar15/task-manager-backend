const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const taskRoutes = require('./routes/taskRoutes');
const errorHandler = require('./middleware/errorHandler');


const app = express();


app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


app.get('/api/health', (req, res) => res.json({ status: 'ok' }));


app.use('/api/tasks', taskRoutes);
app.use((req, res) => {
res.status(404).json({ message: 'Route not found' });
});
app.use(errorHandler);


module.exports = app;