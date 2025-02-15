import mongoose from "mongoose";

const url = 'mongodb://127.0.0.1:27017/mongoosetest';

mongoose.connect(url);

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: String,
    lastName: String,
    address: {
        street: String,
        city: String
    },
    created: {
        type: Date,
        default: Date.now
    }
});

const TestUser = mongoose.model('TestUser',userSchema);
const testUser1 = new TestUser({
    _id: new mongoose.Types.ObjectId(),
    firstName: 'Olek',
    lastName: 'Kowalski',
    address: {
        street: 'Kronowska',
        city: "wawa"
    }
});

await testUser1.save();

const userDb = await TestUser.findOne({});
//const userDb = await TestUser.findOne({firstName: "Olek"})
console.log(userDb);
await mongoose.disconnect();