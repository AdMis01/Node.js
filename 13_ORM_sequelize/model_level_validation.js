import {DataTypes, Sequelize} from 'sequelize';

const sequelize = new Sequelize('test','root','',{
    host: 'localhost',
    dialect: 'mysql',
    decimalNumbers: true
});

const SchoolStudent = sequelize.define('SchoolStudent',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        validate: {
            isInt: true
        }
    },
    name: DataTypes.STRING(32),
    surname: DataTypes.STRING(32),
    email: DataTypes.STRING(128)
}, {
    timestamps: false,
    validate: {
        studentValidation(){
            if(this.name.length < 2){
                throw new Error('imie ma za malo znakow');
            }
            if(this.surname.length < 2){
                throw new Error('nazwisko ma za malo znakow');
            }
            if(!this.email.includes("@")){
                throw new Error('email to nie email');
            }
        }
    }
})

await SchoolStudent.sync();
try{
    await SchoolStudent.create({
        name: 'adam',
        surname: 'kowalski',
        email: 'adam@wp.pl'
    })
}catch(err){
    console.log(err);
}

await sequelize.close();