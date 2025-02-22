import {DataTypes, Sequelize} from 'sequelize';

const sequelize = new Sequelize('test','root','',{
    host: 'localhost',
    dialect: 'mysql'
});

try{
    await sequelize.authenticate();
    console.log('polaczono');
    //await sequelize.close();
}catch(err){
    console.error(err);
}

const Console = sequelize.define('Console',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    brand: {
        type: DataTypes.STRING(12),
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(24),
        allowNull: false
    }

},{
    freezeTableName: true,
    tableName: 'consoles'
})
await Console.sync();

await sequelize.sync().then(() => {
    console.log('tabela stworzona');
}).catch(err => {
    console.log('Blad przy tworzeniu tabeli ',err);
});


await Console.create({
    brand: 'PlayStation',
    name: 'ps2'
});

const ConsoleUpdate = sequelize.define('Console',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    brand: {
        type: DataTypes.STRING(12),
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(24),
        allowNull: false
    },
    cpu:{
        type: DataTypes.STRING(10),
        allowNull: false
    }

},{
    freezeTableName: true,
    tableName: 'consoles'
});

await ConsoleUpdate.sync({force: true});

await Console.create({
    brand: 'Playstation',
    name: 'ps5',
    cpu: 'intell'
})

const ConsoleAlter = sequelize.define('Console',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    brand: {
        type: DataTypes.STRING(12),
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(24),
        allowNull: false
    },
    cpu:{
        type: DataTypes.STRING(10),
        allowNull: false
    },
    gpu: {
        type: DataTypes.STRING(10),
        allowNull: true
    }

},{
    freezeTableName: true,
    tableName: 'consoles'
});

await ConsoleAlter.sync({alter: true});

await Console.create({
    brand: 'Playstation',
    name: 'ps5',
    cpu: 'amd',
    gpu: 'nvidia'
})
await sequelize.close();