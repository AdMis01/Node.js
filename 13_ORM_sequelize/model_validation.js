import {DataTypes, Sequelize} from 'sequelize';

const sequelize = new Sequelize('test','root','',{
    host: 'localhost',
    dialect: 'mysql',
    decimalNumbers: true
});

try{
    await sequelize.authenticate();
    console.log('polaczono');
    //await sequelize.close();
}catch(err){
    console.error(err);
}

const UniversityStudent = sequelize.define("UniversityStudent", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        validate: {
            isInt: true // wymagana liczba całkowita
        }
    },
    name: {
        type: DataTypes.STRING(24),
        allowNull: false,
        validate: {
            len: [3, 24] // min 3 i max 24 znaki
        }
    },
    email: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: true,
        validate: {
            is: /.+\@.+\..+/,
            len: 4 // min 4 znaki
        }
    },
    email2: {
        type: DataTypes.STRING(128),
        allowNull: true,
        unique: true,
        validate: {
            isEmail: {
                msg: "email2 must be a valid email address"
            },
            len: [4, 128] // min 4 i max 128 znaków
        }
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 18,
            max: 100,
            notNull: {
                msg: "age can't be null"
            }
        }
    },
    registerDate: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: true,
        validate: {
            isDate: true, // ma być data
            isAfter: "2010-01-01", // data ma być po 2010 roku
            isBefore: "2055-01-01" // i przed 2055 rokiem
        }
    },
    employmentYearsExperience: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            customValidator(value) {
                if (value < 0) {
                    throw new Error("Employment experience must be above 0, can't be negative");
                }
            }
        }
    },
    companyName: {
        type: DataTypes.STRING(32),
        defaultValue: "Example Ltd.",
        allowNull: true,
        validate: {
            contains: "Ltd" // string musi mieć tekst Ltd
        }
    },
    favColor: {
        type: DataTypes.STRING(12),
        defaultValue: "red",
        validate: {
            //isNull: true, // wymaga null
            isAlpha: true, // tylko litery
            //isAlphanumeric: true, // liczby oraz litery, ale bez spacji przecinka czy _
            //isInt: true,
            //isFloat: true,
            //isDecimal: true, // jakikolwiek number
            notEmpty: true, // nie może być ""
            isLowercase: true, // małe litery, isUppercase też dostępne
            isIn: [["red", "green", "blue", "white", "orange"]],
            notIn: [["something", "bad"]],
            notContains: "bar"
        }
    },
    linkedin: {
        type: DataTypes.STRING(128),
        allowNull: true,
        validate: {
            isUrl: true,
            //isCreditCard: true
        }
    }
});


await UniversityStudent.sync();

try {
    await UniversityStudent.create({
        name: "Ola",
        email: "ola.kowalska@gmail.com",
        email2: "ola.kowalska2@gmail.com",
        age: 29,
        registerDate: new Date(),
        employmentYearsExperience: 4,
        companyName: "Ola Comapny Ltd.",
        favColor: "green",
        linkedin: "https://linkedin.com/ola.kowalska"
    });
} catch (err) {
    console.error(err);
}




await sequelize.close();