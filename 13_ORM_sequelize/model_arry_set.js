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

const Train = sequelize.define('Train',{
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    brand: {
        type: DataTypes.STRING(12),
        allowNull: false
    },
    model: {
        type: DataTypes.STRING(24),
        allowNull: false
    },
    carriageIds: {
        type: DataTypes.STRING,
        allowNull: false,
        get(){
            return this.getDataValue('carriageIds').split(',');
        },
        set(v){
            this.setDataValue('carriageIds',v.join(','));
        }
    }

})


await sequelize.sync().then(() => {
    console.log('tabela stworzona');
}).catch(err => {
    console.log('Blad przy tworzeniu tabeli ',err);
});


await Train.create({
    brand: 'pendolino',
    model: '200de',
    carriageIds: ['cr1','cr2','cr2','cr4']
})

await sequelize.close();