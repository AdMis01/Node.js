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



const CarDriver = sequelize.define("CarDriver", {
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(16),
    }
},{
    timestamps: false
});

const SuperCar = sequelize.define("SuperCar", {
    vin : {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    brand: {
        type: DataTypes.STRING(16),
        allowNull: false,
        validate: {len: [1,16]}
    },
    model: {
        type: DataTypes.STRING(16),
        allowNull: false,
        validate: {len: [1,16]}
    }
},{
    timestamps: false
});

const CarEngine = sequelize.define("CarEngine", {
    id : {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(16),
    }
},{
    timestamps: false
});

try{
    CarDriver.hasOne(SuperCar,{
        foreignKey: 'fk_cardriver_id'
    });
    SuperCar.belongsTo(CarDriver,{
        foreignKey: 'fk_cardriver_id'
    });

    SuperCar.hasOne(CarEngine,{
        foreignKey: 'fk_supercar_id',
        type: DataTypes.UUID
    });

    CarEngine.belongsTo(SuperCar,{
        foreignKey: 'fk_supercar_id',
        type: DataTypes.UUID
    });

    await CarDriver.sync();
    await SuperCar.sync();
    await CarEngine.sync();

    const driver = await CarDriver.create({
        name: 'Adam'
    });

    const superCar = await SuperCar.create({
        brand: 'Dodge',
        model: 'Viper'
    })

    await superCar.setCarDriver(driver);

    const carEngine = await CarEngine.create({
        name: 'upm-39.5'
    })

    await carEngine.setSuperCar(superCar);

    const carDb = await CarDriver.findByPk(driver.dataValues.id,{
        include: [{
            model: SuperCar,
            include: [CarEngine]
        }]
    });

    console.log(JSON.stringify(carDb.dataValues, null,4));
}catch(err){
    console.log(err);
}



await sequelize.close();
