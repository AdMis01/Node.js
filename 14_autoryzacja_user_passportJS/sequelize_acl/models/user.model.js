import { DataTypes } from "sequelize";
import { sequelize } from "../utility/db.js";
import passport from "passport";

const User = sequelize.define('User',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        validate: {isInt: true}
    },
    name: {
        type: DataTypes.STRING(32),
        allowNull: true,
        validate: {len: [1, 32]}
    },
    surname: {
        type: DataTypes.STRING(64),
        allowNull: true,
        validate: {len: [1, 64]}
    },
    email: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: true,
        validate: {isEmail: true, len: [1,128]}
    },
    password: {
        type: DataTypes.STRING(64),
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Haslo jest wymagane'
            },
            notEmpty: {
                msg: 'Musisz podac haslo'
            },
            isNotEasy: function(val){
                val = val.toLowerCase();
                if(val.includes('12345') || val.includes('54321')){
                    throw new Error("Haslo jest za proste")
                }
            }
        }
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 18,
        validate: {isInt: true}
    },
    address: {
        type: DataTypes.STRING(256),
        allowNull: true,
        validate: {len: [1, 256]}
    },
    role: {
        type: DataTypes.ENUM('admin','director', 'teacher', 'student'),
        defaultValue: 'student',
        allowNull: false,
        validate: {len: [1,12]}
    }

});

export {
    User
}