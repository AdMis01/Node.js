import { Sequelize } from "sequelize";

const sequelize = new Sequelize('schoolacl', 'root','',{
    host: 'localhost',
    dialect: 'mysql',
    decimalNumbers: true
});

sequelize.authenticate().then(()=>{
    console.log('zostalo nawiazane polaczenie z baza');
}).catch((err) => {
    console.error(err);
})

export{
    sequelize
};