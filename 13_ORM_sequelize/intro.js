import {Sequelize} from 'sequelize';

const sequelize = new Sequelize('dane_znajomych','root','',{
    host: 'localhost',
    dialect: 'mysql'
});

try{
    await sequelize.authenticate();
    console.log('polaczono');
    await sequelize.close();
}catch(err){
    console.error(err);
}