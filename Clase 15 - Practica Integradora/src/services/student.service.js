import { studentModel } from "../models/student.model.js";

class StudentService {
    constructor() {
        this.model = studentModel;
    }

    async getAllStudents() {
        return await this.model.find();
    }

    async addStudent(student) {
        return await this.model.create(student)
    }

    async removeStudent(studentId) {
        return await this.model.deleteOne({_id: studentId});
    }
}

export const studentService = new StudentService(); 