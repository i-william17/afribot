const express = require('express');
const courseRoutes = express.Router();
const courseController = require('../controllers/courseController');

// Base route: /api/courses

// Create a new course
courseRoutes.post('/', courseController.createCourse);

// Get all courses
courseRoutes.get('/', courseController.getAllCourses);

// Search courses
courseRoutes.get('/search', courseController.searchCourses);

// Get a single course
courseRoutes.get('/:id', courseController.getCourse);

// Update a course
courseRoutes.put('/:id', courseController.updateCourse);

// Delete a course
courseRoutes.delete('/:id', courseController.deleteCourse);

module.exports = courseRoutes;