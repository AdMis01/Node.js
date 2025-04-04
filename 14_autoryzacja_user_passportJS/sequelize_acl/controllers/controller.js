import { UsersController } from "./UserController.js";
import { SchoolController } from "./SchoolController.js";
import { SubjectController } from "./SubjectController.js";
import { GradeController } from "./GradeController.js";

import {User,School,Subject,Grade} from '../models/schemas.js';

const schoolController = new SchoolController();
const usersControler = new UsersController();
const subjectController = new SubjectController();
const gradeController = new GradeController();

const schoolDb = await schoolController.createSchool({
    name: 'Uniwesity 1',
    address: 'poznanska, 00-000 poz'
});

const schoolDb2 = await schoolController.createSchool({
    name: "University #002",
    address: "Ujazdowskie 23, 00-401 Warszawa"
});

const schoolDb3 = await schoolController.createSchool({
    name: "University #003",
    address: "Marszałkowska 1, 00-101 Warszawa"
});

console.log("schoolDb",schoolDb.dataValues);

const directorDb = await usersControler.createUser({
    name: "Adam",
    surname: "Adamski",
    email: Math.random()+"@example.com",
    password: "test",
    role: "director"
});

await schoolController.setDirector(schoolDb,directorDb);
//await usersControler.setSchool(directorDb,schoolDb);
console.log("directorDb:",directorDb.dataValues);

const directorWithSchoolFromDb = await User.findOne({
    where: {id: directorDb.id},
    include: [
        {model: School}
    ]
});

console.log("director with school:",JSON.stringify(directorWithSchoolFromDb,null,4));
const teacherDb = await usersControler.createUser({
        name: "Alina",
        surname: "Kowalska",
        email: "teacher@example.com",
        password: "test",
        role: "teacher"
    },
    schoolDb
);

console.log("teacher", teacherDb.dataValues);

const student1 = await usersControler.createUser({
        name: "Kasia",
        surname: "Kasińska",
        email: "student1@example.com",
        password: "test",
        role: "student"
    },
    schoolDb
);
console.log("student: ", student1.dataValues);

const student2 = await usersControler.createUser({
        name: "Karol",
        surname: "Karolski",
        email: "student2@example.com",
        password: "test",
        role: "student"
    },
    schoolDb
);
console.log("student: ", student2.dataValues);

const student3 = await usersControler.createUser({
        name: "Daniel",
        surname: "Danielski",
        email: "student3@example.com",
        password: "test",
        role: "student"
    },
    schoolDb
);
console.log("student: ", student3.dataValues);

const subject1 = await subjectController.createSubject({
    name: 'Math'
},
teacherDb,
schoolDb);

await subjectController.addUserToSubject(student1,subject1);
await subjectController.addUserToSubject(student2,subject1);

const grade1 = await gradeController.createGrade({
        grade: 5.0,
        description: "great work!"
    },
    student1,
    teacherDb,
    schoolDb
);

const schoolAllData = await School.findOne({
    where: { id: schoolDb.id },
    include: [
        { model: User, as: "director" },
        { model: User },
        { 
            model: Subject,
            include: [
                { 
                    model: User,
                    include: [
                        {
                            model: Grade,
                            include: [{ model: User, as: "teacher" }]
                        }
                    ]
                },
                { model: User, as: "teacher" }
            ]
        }
    ]
});

console.log("school all data: ",JSON.stringify(schoolAllData,null,4));

export {
    schoolController,
    usersControler,
    subjectController,
    gradeController
};
