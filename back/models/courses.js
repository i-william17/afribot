const mongoose = require('mongoose');

// Lesson Schema
const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['video', 'pdf', 'quiz'],
    required: true,
  },
  content: {
    type: String,
    required: function () {
      return this.type !== 'video';
    },
  },
  videoFile: {
    type: String,
    required: function () {
      return this.type === 'video';
    },
  },
  videoName: {
    type: String,
  },
});

// Section Schema
const sectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  lessons: [lessonSchema],
});

// Main Course Schema
const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  numberOfLessons: {
    type: Number,
    required: true,
  },
  numberOfQuizzes: {
    type: Number,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  overview: {
    type: String,
    required: true,
  },
  objectives: {
    type: String,
    required: true,
  },
  prerequisites: {
    type: String,
  },
  targetAudience: {
    type: String,
  },
  instructor: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  thumbnailImage: {
    type: String,
  },
  introductionVideo: {
    type: String,
  },
  downloadableMaterials: [
    {
      name: String,
      content: String,
    },
  ],
  sections: [sectionSchema],
  settings: {
    certificationType: {
      type: String,
      enum: ['none', 'completion', 'graded'],
      default: 'none',
    },
    enrollmentLimit: {
      type: Number,
    },
    startDate: {
      type: Date,
    },
    durationWeeks: {
      type: Number,
    },
  },
  pricing: {
    basePrice: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: 'KSH',
    },
    discount: {
      type: Number,
    },
    enrollmentDuration: {
      type: Number,
    },
  },
  meta: {
    tags: {
      type: [String],
      default: [],
    },
    language: {
      type: String,
      default: 'en',
    },
    skillLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
  },
  status: {
    type: String,
    enum: ['Draft', 'Published'],
    default: 'Draft',
  },
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
