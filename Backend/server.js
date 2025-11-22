require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const linkRoutes = require('./routes/linkRoutes');
const errorHandler = require('./middlewares/errorMiddleware');

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get('/healthz', (req, res) => {
  res.json({ ok: true, version: '1.0', uptime: process.uptime() });
});

// App routes
app.use('/', linkRoutes);

// Error handler
app.use(errorHandler);

// MongoDB connection and start server
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`TinyLink backend running on :${PORT}`)))
  .catch(err => console.error('DB connection error:', err));
