import mongoose, { mongo } from "mongoose";

const url = 'mongodb://127.0.0.1:27017/mongoosetest';

mongoose.connect(url);

const Tv = mongoose.model("Tv", new mongoose.Schema({
    brand:String,
    model:String,
    size: Number
}))

const Remote = mongoose.model("Remote",new mongoose.Schema({
    brand: String,
    tv: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tv'
    }
}));

await Tv.deleteMany({});
await Remote.deleteMany({});


const svd = new Tv({
    brand: 'SVD',
    model: 'RLCD',
    size: 32
});

const tvDb = await svd.save();
const svdRemote = new Remote({
    brand: 'svd',
    tv: tvDb._id.toString()
})

const remoteControlDb = await svdRemote.save();

const remoteDb = await Remote.find({}).populate('tv');

console.log(remoteDb);

const remoteDb2 = await Remote.find({}).populate('tv','-__v');//to co ma być pominiete dodajac minus
console.log(remoteDb2)


const remoteDb3 = await Remote.find({}).populate('tv','-__v').select('-__v');//to co ma być pominiete dodajac minus
console.log(remoteDb3)