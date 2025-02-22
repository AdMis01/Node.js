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



const Administrator = sequelize.define("Administrator", {
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
    },
    surname: {
        type: DataTypes.STRING(16),
        allowNull: false,
        validate: {
            len: [2, 16]
        }
    },
    email: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    }
},{
    timestamps: false
});

const AdminIdCard = sequelize.define("AdminIdCard", {
    id : {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    expirationDate: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('current_timestamp'),
        validate: {
            isDate: true
        }
    }
    
},{
    timestamps: false
}); 

try{
    Administrator.hasOne(AdminIdCard);
    AdminIdCard.belongsTo(Administrator);

    await Administrator.sync();
    await AdminIdCard.sync();

    const admin = await Administrator.create({
        name: 'Admin 1',
        surname: 'Adminiski',
        email: 'admin@wp.pl'
    });

    const adminIdCard = await AdminIdCard.create({})
    await adminIdCard.setAdministrator(admin);
    const adminDB = await Administrator.findByPk(admin.dataValues.id,{
        include: AdminIdCard
    });


    console.log(adminDB.dataValues);
}catch(err){
    console.log(err);
}



await sequelize.close();
