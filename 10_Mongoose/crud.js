import mongoose, { mongo } from "mongoose";

const url = 'mongodb://127.0.0.1:27017/mongoosetest';

mongoose.connect(url);

const carSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    brand: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,
        maxLength: 24
    },
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,
        maxLength: 24
    },
    color: {
        type: String,
        required: false,
        enum: ["red","black","white","orange","yellow","blue","green"]
    },
    topSpeed: {
        type: Number,
        required: false,
        validate: {
            validator: function(v){
                return v > 0;
            },
            message: "TopSpeed wieksza niz 0"
        }

    },
    created: {
        type: Date,
        default: Date.now
    }
})

const Car = mongoose.model("Car",carSchema);
const car1 = new Car({
    _id: new mongoose.Types.ObjectId(),
    brand: 'Ford',
    name: 'T',
    color: "blue",
    topSpeed: 200
})

const car2 = new Car({
    _id: new mongoose.Types.ObjectId(),
    brand: 'Dodge',
    name: 'Chalanger',
    color: "black",
    topSpeed: 300
})

const car3 = new Car({
    _id: new mongoose.Types.ObjectId(),
    brand: 'Ford',
    name: 'Mustang',
    color: "yellow",
    topSpeed: 250
})

const car4 = new Car({
    _id: new mongoose.Types.ObjectId(),
    brand: 'Dodge',
    name: 'Viper',
    color: "white",
    topSpeed: 320
})

try{
    await Car.deleteOne({brand: 'Ford'});
    await Car.deleteMany({});

    const car1Db = await car1.save();
    const carArr = [car2,car3,car4];
    await Car.insertMany(carArr);

    const carById = await Car.findById(car1Db._id);
    console.log(carById._id);

    const carByBrand = await Car.findOne({brand: 'Dodge',name: 'Viper'})
    console.log(carByBrand.color);
    carByBrand.color = "red";
    console.log(carByBrand.color);
    await carByBrand.save();

    const update = {topSpeed: 300};
    const viperDoc = await Car.findOneAndUpdate({name: "Viper"},update,{new: true});
    console.log(viperDoc.topSpeed);

    const mustangById = await Car.findOne({name: 'Mustang'});
    await Car.findByIdAndDelete(mustangById._id);
}catch(err){
    console.log("blad",err.message);
}finally{
    await mongoose.disconnect();
}