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

const WebShopCustomer = sequelize.define("WebShopCustomer", {
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        validate: {
            isInt: true
        }
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
    shopPoints: {
        comment: 'punkty',
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0,
            max: 10000,
            notNull: {
                msg: 'punkty nie moga byc null'
            },
            notBelwoZero(value){
                if(value < 0){
                    throw new Error('Punkty na minisie ')
                }
            }
        }
    },
    age:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 18,
            max: 100,
            notNull: {
                msg: 'age jest null'
            }
        }
    }
    
    
});

await WebShopCustomer.sync({force: true});

function getRandomElFromArr(arr){
    return arr[Math.floor(Math.random()* arr.length)];
}

function getRandomCustomer(){
    const namesArr = ['Adam','Ksia','Iga','Marzena','Jan'];
    const surnameArr = ['Kowalski','Karkul','Ilwanko','Blanko','Stolnik'];
    const randNum = Math.floor(Math.random()*10000);
    const name = getRandomElFromArr(namesArr);
    const surname = getRandomElFromArr(surnameArr);

    return {
        name: name,
        surname: surname,
        shopPoints: Math.floor(Math.random() * 1000),
        age: 18 + Math.floor(Math.random() * 50)
    }
}

try{
    const customer = getRandomCustomer();
    await WebShopCustomer.create(customer);

    const customerArr = [];
    for(let i = 0; i < 30; i++){
        customerArr.push(getRandomCustomer());
    }

    const cutomersDb = await WebShopCustomer.bulkCreate(
        customerArr,{
            validate: true
        }
    );

    for(const c of cutomersDb){
        console.log(c.dataValues)
    }
}catch(err){
    console.log(err);
}

await sequelize.close();