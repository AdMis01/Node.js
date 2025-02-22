import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize("test", "root", "", {
  host: "localhost",
  dialect: "mysql",   
  decimalNumbers: true
});

sequelize.beforeConnect(async (config) => {
    console.log('przed połączeniem hook');
});

sequelize.afterConnect(async (config) => {
    console.log('po połączeniu hook');
});

sequelize.beforeDisconnect(async (config) => {
    console.log('przed rozłączeniem hook');
});
sequelize.afterDisconnect(async (config) => {
    console.log('po rozłączeniem hook');
});

sequelize.authenticate().then(() => {
    console.log("Connection has been established successfully.");
}).catch((error) => {
    console.error("Unable to connect to the database: ", error);
});

const UserData = sequelize.define('UserData',{
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
    email: {
        type: DataTypes.STRING(16),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
            len: [2, 20]
        }
    }
},{
    timestamps: false,
    hooks: {
        beforeValidate: async (userData,options) => {
            console.log('przed walidacją',userData.name);
        }
    }
});

UserData.addHook('beforeCreate','someHookname',(userData,options) => {
    console.log('przed stworzeniem uzytkownika',userData.name);
});

UserData.addHook('beforeDestroy','someHookname',(userData,options) => {
    console.log('przed usunieciem uzytkownika',userData.name);
});

UserData.addHook('beforeSave','someHookname',(userData,options) => {
    console.log('przed zapisaniem uzytkownika',userData.name);
});

UserData.addHook('beforeUpsert','someHookname',(userData,options) => {
    console.log('przed nadpisaniem uzytkownika',userData.name);
});

UserData.addHook('afterCreate','someHookname',(userData,options) => {
    console.log('po stworzeniu uzytkownika',userData.name);
});
UserData.addHook('afterDestroy','someHookname',(userData,options) => {
    console.log('po usunieciu uzytkownika',userData.name);
});
UserData.addHook('afterUpdate','someHookname',(userData,options) => {
    console.log('po zaktualizowaniu uzytkownika',userData.name);
});
UserData.addHook('beforeUpdate','someHookname',(userData,options) => {
    console.log('przed zaktulizowaniem uzytkownika',userData.name);
});
UserData.addHook('afterSave','someHookname',(userData,options) => {
    console.log('po zapisaniu uzytkownika',userData.name);
});

UserData.addHook('afterUpsert','someHookname',(userData,options) => {
    console.log('po zapisaniu/aktualizacji uzytkownika',userData.name);
});
UserData.addHook('beforeBulkCreate','someHookname',(userData,options) => {
    console.log('przed utworzeniu wielu rekordów',userData.name);
});
UserData.addHook('afterBulkCreate','someHookname',(userData,options) => {
    console.log('po utworzeniu wielu rekordów',userData.name);
});
UserData.addHook('beforeBulkUpdate','someHookname',(userData,options) => {
    console.log('przed utworzeniu wielu rekordów',userData.name);
});
UserData.addHook('afterBulkUpdate','someHookname',(userData,options) => {
    console.log('po utworzeniu wielu rekordów',userData.name);
});

UserData.removeHook('beforeCreate','someHookName');
await sequelize.sync();

const user1 = await UserData.create({
    name: 'Kasia',
    email: 'zbi@wp.pl'
})