import {Router} from "express";
import { studentService } from "../services/student.service.js";

const studentRouter = Router();

studentRouter.get("/", async (req, res) => {
    try{
        const students = studentService.getAllStudents();
        res.send(students);
    }
    catch(err){
        res.status(500).send({err});
    }
});

studentRouter.post("/", async (req, res) => {
    const student = req.body;
    try{
        const studentAdd = studentService.addStudent(student);
        res.send(studentAdd);
    }
    catch(err){
        res.status(500).send({err});
    }
})

export default studentRouter