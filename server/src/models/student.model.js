import mongoose from "mongoose";
import bcrypt from "bcrypt";

const academicDetailsSchema = new mongoose.Schema(
  {
    qualification: {
      type: String,
      required: true,
    },
    qualifying_institution: {
      type: String,
      required: true,
    },
  },
  { _id: false }
); // no separate _id for subdocuments

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone_no: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other", "Prefer Not To Say"],
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    about: {
      type: String,
    },
    // photo: {
    //   type: String // could be a URL or path to the image
    // },
    profession: {
      type: String,
    },
    institution: {
      type: String,
    },
    course_or_job_role: {
      type: String,
    },
    academic_details: {
      type: [academicDetailsSchema],
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

studentSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const Student = mongoose.model("Student", studentSchema);
