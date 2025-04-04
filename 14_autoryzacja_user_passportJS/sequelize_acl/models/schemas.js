import { sequelize } from "../utility/db.js"; 
import {User} from './user.model.js';
import {School} from './school.model.js';
import { Subject } from "./subject.model.js";
import { Grade } from './grade.model.js';

School.hasMany(User, {
    foreignKey: 'schoolId'
});

User.belongsTo(School, {
    foreignKey: 'schoolId'
});

School.belongsTo(User, {as: 'director'});

School.hasMany(Subject, {
    foreignKey: 'schoolId'
});

Subject.belongsTo(School, {
    foreignKey: 'schoolId'
});

const SubjectUser = sequelize.define('SubjectUser', {}, {
    timestamps: false
});

Subject.belongsToMany(User, {
    through: SubjectUser,
    foreignKey: 'subjectId'
});

User.belongsToMany(Subject, {
    through: SubjectUser,
    foreignKey: 'userId'
});

Subject.belongsTo(User,{as: 'teacher'});

Subject.hasMany(Grade, {
    foreignKey: 'subjectId'
});

Grade.belongsTo(Subject, {
    foreignKey: 'subjectId'
});

Grade.belongsTo(User, {as: 'teacher'});

User.hasMany(Grade, {
    foreignKey: 'studentId'
});

Grade.belongsTo(User, {
    foreignKey: 'studentId'
});

Grade.belongsTo(School);

await sequelize.sync({force: true});


export {
    User,
    School,
    Subject,
    Grade
}