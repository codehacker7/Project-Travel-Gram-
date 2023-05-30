const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      validate: (input) => {
        return validator.isEmail(input);
      }
    },
    password: {
      type: Buffer,
      required: true,
    },
    first_name: {
      type: String,
      required: false,
      validate: (input) => {
        return validator.isAlpha(input, 'en-US');
      },
    },
    last_name: {
      type: String,
      required: false,
      validate: (input) => {
        return validator.isAlpha(input, 'en-US');
      },
    },
    about: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    street: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    state: {
      type: String,
      required: false,
    },
    zip: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: false,
    },
    photo_id: {
      type: String,
      required: false,
    },
    trips: {
      type: Array,
      required: false,
      default: [],
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

const User = mongoose.model('User', UserSchema);

module.exports = User;
