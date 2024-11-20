const express = require('express');
const studentRoutes = express.Router();
const { registerStudent, studentLogin, getStudents } = require('../controllers/studentController');
const multer = require('multer');

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Route for user registration
studentRoutes.post('/signup', upload.single('profileImage'), registerStudent);
studentRoutes.post('/login', studentLogin);
studentRoutes.get('/', getStudents);


module.exports = studentRoutes;
