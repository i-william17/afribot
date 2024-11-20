const Course = require('../models/courses');
const { toast } = require('react-toastify');

const courseController = {
  // Create a new course
  createCourse: async (req, res) => {
    try {
      const course = new Course(req.body);
      await course.save();
      res.status(201).json({ success: true, data: course });
      toast.success('Course created successfully!');
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
      toast.error(error.message);
    }
  },

  // Get all courses
  getAllCourses: async (req, res) => {
    try {
      const courses = await Course.find();
      res.status(200).json({ success: true, data: courses });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Get a single course by ID
  getCourse: async (req, res) => {
    try {
      const course = await Course.findById(req.params.id);
      if (!course) {
        return res.status(404).json({ success: false, error: 'Course not found' });
      }
      res.status(200).json({ success: true, data: course });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Update a course
  updateCourse: async (req, res) => {
    try {
      const course = await Course.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!course) {
        return res.status(404).json({ success: false, error: 'Course not found' });
      }
      res.status(200).json({ success: true, data: course });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  },

  // Delete a course
  deleteCourse: async (req, res) => {
    try {
      const course = await Course.findByIdAndDelete(req.params.id);
      if (!course) {
        return res.status(404).json({ success: false, error: 'Course not found' });
      }
      res.status(200).json({ success: true, data: {} });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Search courses
  searchCourses: async (req, res) => {
    try {
      const { category, level, price, search } = req.query;
      const query = {};

      if (category) query.category = category;
      if (level) query.level = level;
      if (price) query.price = { $lte: parseFloat(price) };
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { shortDescription: { $regex: search, $options: 'i' } },
          { tags: { $in: [new RegExp(search, 'i')] } }
        ];
      }

      const courses = await Course.find(query);
      res.status(200).json({ success: true, data: courses });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

};

module.exports = courseController;