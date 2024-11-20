const Student = require('../models/student');
const bcrypt = require('bcryptjs');

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
const registerStudent = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, age, password } = req.body;

    // Check if user already exists
    const studentExists = await Student.findOne({ email });
    if (studentExists) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    // Save profile image if provided
    const profileImage = req.file ? `/uploads/${req.file.filename}` : null;

    // Create user
    const student = await Student.create({
      firstName,
      lastName,
      email,
      phone,
      age,
      password,
      profileImage,
    });

    if (student) {
      res.status(201).json({
        message: 'User registered successfully',
        student: {
          id: student._id,
          firstName: student.firstName,
          lastName: student.lastName,
          email: student.email,
          profileImage: student.profileImage,
        },
      });
    } else {
      res.status(400).json({ message: 'Invalid student data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const studentLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      const student = await Student.findOne({ email });
  
      if (!student || !(await bcrypt.compare(password, student.password))) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      res.status(200).json({
        message: 'Login successful',
        student: {
          id: student._id,
          firstName: student.firstName,
          lastName: student.lastName,
          email: student.email,
        },
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json({ message: 'Student updated successfully', student });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerStudent,
  getStudents,
  studentLogin,
  getStudentById,
  updateStudent,
  deleteStudent,
};
