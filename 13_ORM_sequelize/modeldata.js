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


const Truck = sequelize.define('Truck',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    vin:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
    },
    brand:{
        type: DataTypes.STRING(12),
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    horsePower: {
        type: DataTypes.DECIMAL(5,2),
        allowNull: true
    },
    color: {
        type: DataTypes.ENUM('black','red','yellow','gree','blue'),
        allowNull: false,
        defaultValue: 'blue'
    },
    lastMechnicCheck: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    customOptions: {
        type: DataTypes.JSON,
        allowNull: true
    }
},{
    underscored: true
})


await sequelize.sync().then(() => {
    console.log('Animal tabela stworzona');
}).catch(err => {
    console.log('Blad przy tworzeniu tabeli ',err);
});

await Truck.create({
    brand: 'ford',
    name: 'f150',
    color: 'blue',
    lastMechnicCheck: new Date(2023,2,12),
    customOptions: JSON.stringify({
        leatherSeats: true,
        extendedCabin: true
    })
})

await sequelize.close();