const express = require('express');
const cors = require('cors');
const apodRoutes = require('./routes/apod.routes');
const errorHandler = require('./middleware/errorHandler');
const { PORT } = require('./config/env');

const app = express();

app.use(cors());
app.use(express.json());

// Health
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

// APOD routes
app.use('/api/apod', apodRoutes);

// error handler (should be last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`APOD backend running on port ${PORT}`);
});
