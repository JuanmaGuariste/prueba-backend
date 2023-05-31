import mongoose from 'mongoose'
import { studentSchema } from './student.model.js';

const courseSchema = new mongoose.Schema({
    name: String,       
    year: Number,        
    students: [studentSchema],
});

export const courseModel = mongoose.model('courses', courseSchema)