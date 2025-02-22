import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize("drony", "root", "", {
  host: "localhost",
  dialect: "mysql",   
  decimalNumbers: true
});
sequelize.authenticate().then(() => {
    console.log("Connection has been established successfully.");
}).catch((error) => {
    console.error("Unable to connect to the database: ", error);
});

const Address = sequelize.define('Address',{
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },street: {
        type: DataTypes.STRING(16),
        allowNull: false,
        validate: {
            len: [2, 16]
        }
    },city: {
        type: DataTypes.STRING(16),
        allowNull: false,
        validate: {
            len: [2, 16]
        }
    },country: {
        type: DataTypes.STRING(16),
        allowNull: false,
        validate: {
            len: [2, 16]
        }
    }
});

const DroneFactory = sequelize.define('DroneFactory',{
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
});

Address.hasOne(DroneFactory,{
    foreignKey: 'fk_address_id'
});

DroneFactory.belongsTo(Address,{
    foreignKey: 'fk_address_id'
});


const Drone = sequelize.define('Drone',{
    vin : {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    model: {
        type: DataTypes.STRING(16),
        allowNull: false,
        validate: {
            len: [2, 16]
        }
    },
    price: {
        type: DataTypes.DECIMAL,
        defaultValue: 0,
        allowNull: true,
        validate: {
            isDecimal: true,
            priceAboveZero(value){
                if(value < 0){
                    throw new Error('nie moze byc poniezej zera')
                }
            }
        }
    }
});

DroneFactory.hasMany(Drone,{
    foreignKey: 'fk_factory_id'
});

Drone.belongsTo(DroneFactory,{
    foreignKey: 'fk_factory_id'
});

const BusinessEntity = sequelize.define('BusinessEntity',{
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
})

Address.hasOne(BusinessEntity,{
    foreignKey: 'fk_address_id'
});

BusinessEntity.belongsTo(Address,{
    foreignKey: 'fk_address_id'
});

const Invoice = sequelize.define('Invoice',{
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    invoiceNumver: {
        type: DataTypes.STRING(16),
        allowNull: false,
        validate: {
            len: [2, 16]
        } 
    },
    netSum: {
        commnet: 'invoice amount vefore tax',
        type: DataTypes.DECIMAL(10,2),
        defaultValue: 0,
        allowNull: false,
        validate: {
            isDecimal: true
        }
    },
    tax: {
        commnet: 'tax on invoice',
        type: DataTypes.DECIMAL(10,2),
        defaultValue: 0,
        allowNull: false,
        validate: {
            isDecimal: true
        }
    },grosseSum: {
        commnet: 'invoce after tax',
        type: DataTypes.DECIMAL(10,2),
        defaultValue: 0,
        allowNull: false,
        validate: {
            isDecimal: true
        }
    },
});

Invoice.belongsTo(BusinessEntity,{as: 'seller'});
Invoice.belongsTo(BusinessEntity,{as: 'buyer'});

Invoice.hasMany(Drone,{
    foreignKey: 'fk_invoice_id'
})

Drone.belongsTo(Invoice,{
    foreignKey: 'fk_invoice_id'
});

await sequelize.sync({force: true});

const factoryAddress = await Address.create({
    street: 'fabryczna 1',
    city: 'poz',
    country: 'polska'
});

const facotry = await DroneFactory.create({
    name: 'drone factory'
});

await facotry.setAddress(factoryAddress);

const buyer1 = await BusinessEntity.create({
    name: 'buyer entity'
});

const buyerAddress1 = await Address.create({
    street: 'zlota 44',
    city: 'poz',
    country: 'polska'
});

const seller1 = await BusinessEntity.create({
    name: 'seller entity'
});

const sellerAddress1 = await Address.create({
    street: 'wilcza 1',
    city: 'poz',
    country: 'polska'
})
await seller1.setAddress(sellerAddress1);
await buyer1.setAddress(buyerAddress1);


const drone1 = await Drone.create({
    brand: 'xeon',
    model:'e3',
    price: 600
});
await drone1.setDroneFactory(facotry);

const drone2 = await Drone.create({
    brand: 'xeon',
    model:'e3',
    price: 600
});
await drone2.setDroneFactory(facotry);

const invoice = await Invoice.create({
    invoiceNumver: 'fak#1',
    netSum: 1000,
    tax: 230,
    grosseSum: 1230
});

await invoice.setSeller(seller1);
await invoice.setBuyer(buyer1);

await drone1.setInvoice(invoice);
await drone2.setInvoice(invoice);

const factoryDb = await DroneFactory.findOne({
    include: [
        {model: Address},
        {model: Drone}
    ]
})

console.log('\n', JSON.stringify(factoryDb,null,4));

const invoiceDB = await Invoice.findOne({
    include : [
        {model: BusinessEntity, as: 'seller', include: Address},
        {model: BusinessEntity, as: 'buyer', include: Address},
        {model: Drone, include: DroneFactory}
    ]
});

console.log('\n', JSON.stringify(invoiceDB,null,4));


await sequelize.close();