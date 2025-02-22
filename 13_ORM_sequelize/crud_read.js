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

await WebShopCustomer.sync();

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

function logCustomers(c){
    console.log(c.id,c.name,c.surname,c.shopPoints,c.age);
}

try{
    const customers1= await WebShopCustomer.findAll();
    console.log('klienci\n');
    customers1.forEach(c => {
        logCustomers(c);
    });

    const customers2= await WebShopCustomer.findAll({
        attributes: ['id','name']
    });
    console.log('klienci\n');
    customers2.forEach(c => {
        logCustomers(c);
    });

    const customers3= await WebShopCustomer.findAll({
        attributes: [['id','customerID'],'name']
    });
    console.log('klienci\n');
    customers3.forEach(c => {
        c = c.dataValues;

        console.log(c.customerID);
    });


    const customersNumId = await WebShopCustomer.findAll({
        attributes: ['name', [sequelize.fn('count',sequelize.col('id')), 'numId']]
    });

    console.log(customersNumId[0].dataValues);

    const customersSumaWiek = await WebShopCustomer.findAll({
        attributes: ['name', [sequelize.fn('sum',sequelize.col('age')), 'ageSUM']]
    });
    console.log(customersSumaWiek[0].dataValues);

    const customerMaxId = await WebShopCustomer.findAll({
        attributes: {
            include: [
                [sequelize.fn('max',sequelize.col('id')),'maxID']
            ],
            exclude: ['age']
        }
    });

    console.log(customerMaxId[0].dataValues);


}catch(err){
    console.log(err);
}

await sequelize.close();