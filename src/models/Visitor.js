import mongoose from 'mongoose';

const VisitorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  country: {
    type: String,
    required: true,
    trim: true,
  },
  interests: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastActivity: {
    type: Date,
    default: Date.now,
  },
  chatHistory: [{
    role: {
      type: String,
      enum: ['user', 'assistant'],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  }],
});

const ReviewSchema = new mongoose.Schema({
  visitorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Visitor',
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  review: {
    type: String,
    required: true,
    trim: true,
  },
  story: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Prevent duplicate model compilation
const Visitor = mongoose.models.Visitor || mongoose.model('Visitor', VisitorSchema);
const Review = mongoose.models.Review || mongoose.model('Review', ReviewSchema);

export { Visitor, Review };