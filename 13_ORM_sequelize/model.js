import {DataTypes, Sequelize} from 'sequelize';

const sequelize = new Sequelize('test','root','',{
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


const Animal = sequelize.define('Animal',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: true
    },
    numLegs: {
        type: DataTypes.STRING,
        defaultValue: 2,
        allowNull: true
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('current_timestamp'),
        allowNull: false
    }
})


await sequelize.sync().then(() => {
    console.log('Animal tabela stworzona');
})