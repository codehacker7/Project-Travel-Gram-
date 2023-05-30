const mongoose = require('mongoose');
const validator = require('validator');

const ActivitySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      validate: (images) => {
        return images.forEach((image) => validator.isURL(image));
      },
    },
    address: {
      type: String,
    },
    coordinates: {
      type: mongoose.Schema.Types.Mixed,
    },
    selectedTripItem: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

const Activity = mongoose.model('Activity', ActivitySchema);

module.exports = Activity;
