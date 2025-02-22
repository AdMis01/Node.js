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



const Country = sequelize.define("Country", {
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(16),
        allowNull: false,
        validate: {
            len: [2, 16]
        }
    }
},{
    timestamps: false
});

const City = sequelize.define("City", {
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(16),
        allowNull: false,
        validate: {
            len: [2, 16]
        }
    }
},{
    timestamps: false
});

try{
    Country.hasMany(City,{
        foreignKey: 'fk_country_id'
    });
    City.belongsTo(Country,{
        foreignKey: 'fk_country_id'
    })

    await Country.sync();
    await City.sync();

    const country = await Country.create({
        name: 'Polska'
    });

    const city1 = await City.create({
        name: 'Poz'
    });

    await city1.setCountry(country);

    const city2 = await City.create({
        name: 'wawa',
        fk_country_id: country.id
    });

    const countryDb = await Country.findByPk(country.dataValues.id,{
        include: [{
            model: City
        }]
    });

    console.log(JSON.stringify(countryDb))
}catch(err){
    console.log(err);
}

await sequelize.close();
