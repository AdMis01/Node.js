import mongoose from "mongoose";

const url = 'mongodb://127.0.0.1:27017/mongoosetest';

mongoose.connect(url);

const gameSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type : String,
        required : true,
        trim: true,
        minLength: 3,
        maxLength: 128
    },
    published: {
        type: Boolean,
        required: true,
        default: false
    },
    releaseDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    ratings: [
        {
            rating: {
                type: Number,
                required: true,
                min: 1,
                max: 10
            },
            created: {
                type: Date,
                default: Date.now
            }
        }
    ],
    platforms: {
        type: [String]

    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    }
});

gameSchema.methods.getAcerageRatring = function(){
    if(!this.ratings)return null;

    let ratringSum = 0;
    for(const r of this.ratings) ratringSum+= r.rating;
    this.averageRating = (ratringSum/this.ratings.length).toFixed(1);
    return this.averageRating;
}

const Game = mongoose.model("Game",gameSchema);

const driver = new Game({
    _id: new mongoose.Types.ObjectId(),
    title: 'Driver',
    published: true,
    releaseDate: new Date(1999, 5, 25),
    ratings: [
        {rating: 8.5},
        {rating: 9.5},
        {rating: 8.2},
        {rating: 5},
    ],
    platforms: ["PSX", "PC", "IOS","MAC"]
});

let driverFromDb = await Game.findOne({title: "Driver"});
if(!driverFromDb){
    driverFromDb = await driver.save();
    if(driverFromDb) console.log("nowa gra zapisana");
}


console.log(driverFromDb.getAcerageRatring());