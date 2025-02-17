import mongoose, { mongo } from "mongoose";

const url = 'mongodb://127.0.0.1:27017/mongoosetest';

mongoose.connect(url);

const licenseSchema = new mongoose.Schema({
    license: String
})

const License = mongoose.model("License",licenseSchema);


const driverSchema = new mongoose.Schema({
    name: String,
    surname: String,
    license: licenseSchema
})

const Driver = mongoose.model("Driver",driverSchema);

const truckSchema = new mongoose.Schema({
    brand: String,
    name: String,
    driver: driverSchema
})

const Truck = mongoose.model("Trcuk",truckSchema);

await Truck.deleteMany({})
const license1 = new License({license: "QWERT12345"});
const driver1 = new Driver({
    name: "Adam",
    surname: 'Kowal',
    license: license1
})

const truck1 = new Truck({
    brand: 'Ken',
    name: 't100',
    driver: driver1
})


await truck1.save();

const truckDb = await Truck.find({});
console.log(truckDb)