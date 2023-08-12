const { Schema } = require("mongoose");
const Joi = require("joi");

const emailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// схемы Joi для контактів
const addContactsSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(10).required(),
  favorite: Joi.boolean(),
});

const patchContactsFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

// схема mongoose для контактів
const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      requured: true,
    },
  },
  { versionKey: false, timestamps: true }
);

// схеми Joi для користувачів 
const registerSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegexp).required(),
});

// схеми Joi для email користувачів 
const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

// схема mongoose для користувачів 

const userSchema = new Schema(
  {
    password: {
      type: String,
      minlength: 6,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Ema/* il is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: "",
    },
    avatarURL: String,
     verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = {
  addContactsSchema,
  emailSchema,
  patchContactsFavoriteSchema,
  contactSchema,
  userSchema,
  registerSchema,
};