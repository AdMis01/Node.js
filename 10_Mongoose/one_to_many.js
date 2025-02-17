import { MongoTopologyClosedError } from "mongodb";
import mongoose, { mongo } from "mongoose";

const url = 'mongodb://127.0.0.1:27017/mongoosetest';

mongoose.connect(url);


const ownerSchema = mongoose.Schema({
    name: String,
    surname: String
});

const Owner = mongoose.model('Owner',ownerSchema);
const houseSchema = mongoose.Schema({
    street: String,
    city: String,
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "Owner"
    }
});

const House = mongoose.model("House", houseSchema);

await House.deleteMany({});
await Owner.deleteMany({});

const ola = await Owner.create({name: 'ola',surname: 'Kowal'});

await House.create({
    street: 'Wil',
    city: 'wawa',
    owner: ola
})

await House.create({
    street: 'zlota',
    city: 'waw',
    owner: ola
});

const houses = await House.find({}).populate('owner');

console.log(houses)
