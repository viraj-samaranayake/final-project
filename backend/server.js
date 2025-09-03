const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const cors = require('cors');
const http = require('http');
const socketio = require('socket.io');
const tutorRoutes = require('./routes/tutorRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/tutor', tutorRoutes);

const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});


io.on('connection', socket => {
  socket.on('join-room', ({ roomId, userId }) => {
    socket.join(roomId);
    socket.to(roomId).emit('user-connected', userId);
    socket.on('signal', data => io.to(roomId).emit('signal', data));
    socket.on('disconnect', () => io.to(roomId).emit('user-disconnected', userId));
  });
});


app.use('/api/auth', authRoutes);
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/tutor', require('./routes/verificationRoutes'));
app.use('/api/tutor', require('./routes/tutorRoutes'));
app.use('/api/student', require('./routes/studentRoutes'));



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
