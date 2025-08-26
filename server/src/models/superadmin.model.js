import mongoose from 'mongoose';

const superadminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}); 
export const SuperAdmin = mongoose.model('SuperAdmin', superadminSchema);