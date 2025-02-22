import { Sequelize, DataTypes,Op } from "sequelize";

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
    const customers1= await WebShopCustomer.findAll({
        where: {
            name: 'Jan',
            surname: 'Kowalski'
        },
        offset: 3,
        limit: 2
    });

    console.log('klienci\n');
    customers1.forEach(c => {
        logCustomers(c.dataValues);
    });


    const customers2= await WebShopCustomer.findAll({
        where: {
            name: {
                [Op.eq]: 'Jan'
            },
            id: {
                [Op.gt]: 3
            }
        },
        offset: 3,
        limit: 2
    });

    console.log('klienci\n');
    customers2.forEach(c => {
        logCustomers(c.dataValues);
    });
    
    const customers3= await WebShopCustomer.findAll({
        where: {
            [Op.and]: [
            //[Op.or]: [
                {id: {[Op.gte]: 5}},
                //{id: {[Op.lte]: 5}},
                {name: 'Ksia'},
                //{shopPoints: {[Op.between]:[1,1000]}}
                //{shopPoints: {[Op.notBetween]:[1,1000]}}
                //{name: {[Op.in]:['Adam','Marzena','Jan']}}
                //{name: {[Op.notIn]:['Adam','Marzena','Jan']}}
                //{name: {[Op.like]: 'A%'}}
                //{name: {[Op.notLike]: 'A%'}}
                //{name: {[Op.startsWith]: 'A'}}
                //{name: {[Op.endsWith]: 'to'}}
                //{name: {[Op.substring]: 'A'}} //zawiera 
                //{id: {[Op.eq]: 12}}
                //{id: {[Op.ne]: 12}}
                
            ]
        },
        offset: 3,
        limit: 2
    });

    console.log('klienci\n');
    customers3.forEach(c => {
        logCustomers(c.dataValues);
    });

    const customers4= await WebShopCustomer.findOne({
        where: {
            name: 'Jan'
        }
    });

    const customers5= await WebShopCustomer.findOrCreate({
        where: {
            name: 'QWERTY'
        },
        defaults: {
            surname: 'Kowalski',
            shopPoints: 0,
            age: 18
        }
    });

    console.log(customers5);

    const customers6= await WebShopCustomer.findAndCountAll({
        where: {
            name: {
                [Op.like]: 'Ada%'
            }
        }
    });
    console.log('test');
    console.log(customers6.rows);
    console.log(customers6.count);

}catch(err){
    console.log(err);
}

await sequelize.close();