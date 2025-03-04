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

School.belongsTo(User, {as})

export {
    User,
    School,
    Subject,
    Grade
}