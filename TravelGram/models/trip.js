const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema(
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
    },
    owner: {
      type: String,
      required: true,
    },
    collaborators: {
      type: [String],
    },
    activities: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Activity',
      },
    ],
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

const Trip = mongoose.model('Trip', TripSchema);

module.exports = Trip;
