// index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// ✅ Firebase admin initialization happens in this file
require('dotenv').config();
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// ✅ Import routes
const authRoutes = require('./src/routes/auth');
const messageRoutes = require('./src/routes/messages');

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(bodyParser.json());

// ✅ Mount routes with correct prefixes
app.use('/api/auth', authRoutes);
app.use('/api/message', messageRoutes);

// ✅ Health check
app.get('/', (req, res) => {
  res.send('API is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
