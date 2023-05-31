import {Router} from "express";
import { courseService } from "../services/course.service.js";

const courseRouter = Router();

courseRouter.get("/", async(req, res) =>{
    try{
        const courses = await courseService.getAllCourses()
        res.send(courses)
    }
    catch(err){
        res.status(500).send({err})
    }
})

courseRouter.post("/", async(req, res) =>{
    const course = req.body
    try{
        const courseAdded = await courseService.addCourse(course)
        res.send({courseAdded})
    }
    catch(err){
        res.status(500).send({err})
    }
})

courseRouter.post("/:courseId", async(req, res) =>{
    const courseId = req.params.courseId;
    const studentId = req.body.sId;
    try{
        const courseAdded = await courseService.addStudentToCourse(
            courseId,
            studentId
            );
        res.send(courseAdded)
    }
    catch(err){
        res.status(500).send({err})
    }
})

export default courseRouter;