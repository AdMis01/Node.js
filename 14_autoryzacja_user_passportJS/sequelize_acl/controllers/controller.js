import { UsersController } from "./UserController.js";
import { SchoolController } from "./SchoolController.js";
import { SubjectController } from "./SubjectController.js";
import { GradeController } from "./GradeController.js";


const schoolController = new SchoolController();
const usersControler = new UsersController();
const subjectController = new SubjectController();
const gradeController = new GradeController();

export {
    schoolController,
    usersControler,
    subjectController,
    gradeController
};
