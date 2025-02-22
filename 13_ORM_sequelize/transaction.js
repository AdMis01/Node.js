import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize("test", "root", "", {
  host: "localhost",
  dialect: "mysql",   
  decimalNumbers: true
});


sequelize.authenticate().then(() => {
    console.log("Connection has been established successfully.");
}).catch((error) => {
    console.error("Unable to connect to the database: ", error);
});

const Table = sequelize.define('Table',{
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    brand: {
        type: DataTypes.STRING(16),
        allowNull: false,
        validate: {
            len: [2, 16]
        }
    },
    model: {
        type: DataTypes.STRING(16),
        allowNull: false,
        validate: {
            len: [2, 16]
        }
    }
})

const trx = await sequelize.transaction();

try{
    await sequelize.sync();
    const tablet1 = await Table.create({
        brand: 'Tablet',
        model: 'x1'
    },{
        transaction: trx
    });

    const tablet2 = await Table.create({
        brand: 'Tablet',
        model: 'x2'
    },{
        transaction: trx
    });

    await trx.commit();

}catch(err){
    console.log(err);
    await trx.rollback();
}

await sequelize.close();