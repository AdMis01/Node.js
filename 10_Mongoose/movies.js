import mongoose, { mongo } from "mongoose";

const url = "mongodb://127.0.0.1:27017/mongoosetest";
mongoose.connect(url);

const movieSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title:{
        type: String,
        required: true,
        trim: true,
        minLength: 1,
        maxLength: 128
    },
    premiere: {
        type: Date,
        default: Date.now
    },
    director: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person'
    },
    writers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref:'Person'
        }
    ],
    actors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person'
    }],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }],
    created: {
        type: Date,
        default: Date.now
    }
})

const Movie = mongoose.model('Movie',movieSchema);

const personSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,
        maxLength: 16
    },
    surname: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,
        maxLength: 32
    },
    movieActor: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie'
    }],
    movieDirector: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie'
    }],
    movieWriter: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie'
    }],
    created: {
        type: Date,
        default: Date.now
    }
})

const Person = mongoose.model('Person',personSchema);

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,
        maxLength: 16
    },
    surname: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,
        maxLength: 32
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,
        maxLength: 128,
        unique: true,
        match: /.+\@.+\..+/
    },
    reviews: [{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }],
    created: {
        type: Date,
        default: Date.now
    }

});

const User = mongoose.model('User',userSchema);

const reviewSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie'
    },
    body: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,
        maxLength: 2048
    },
    score: {
        type: Number,
        validate: {
            validator: function(v){
                return v >= 1 && v <= 5;
            },
            message: 'Wynik miedzy 1 a 5'
        }
    }
});

const Review = mongoose.model('Review', reviewSchema);

await Person.deleteMany({})
await Movie.deleteMany({})
await User.deleteMany({})
await Review.deleteMany({})

const scorsese = await Person.create({
    _id: new mongoose.Types.ObjectId(),
    name: 'Martyna',
    surname: 'Scorsese'
})

const stone = await Person.create({
    _id: new mongoose.Types.ObjectId(),
    name: 'Scharon',
    surname: 'Stone'
})

const deNiro = await Person.create({
    _id: new mongoose.Types.ObjectId(),
    name: 'Robert',
    surname: 'deNiro'
})

const jack = await Person.create({
    _id: new mongoose.Types.ObjectId(),
    name: 'Jack',
    surname: 'Sparrow'
})

const pilegii = await Person.create({
    _id: new mongoose.Types.ObjectId(),
    name: 'Nicholas',
    surname: 'Pileggi'
})

const casino = await Movie.create({
    _id: new mongoose.Types.ObjectId(),
    title: 'Casino',
    premiere: new Date(1995,1,1),
    director: scorsese

    //actors: [stone,deNiro,jack]
})

async function connectMovieToActor(movie, person) {
    await Movie.findByIdAndUpdate(
        movie._id,
        {$addToSet: {actors: person._id}}
    );
    await Person.findByIdAndUpdate(
        person._id,
        {$addToSet: {movieActor: movie._id}}

    )
}

async function connectMovieToWriter(movie, person) {
    await Movie.findByIdAndUpdate(
        movie._id,
        {$addToSet: {writers: person._id}}
    );
    await Person.findByIdAndUpdate(
        person._id,
        {$addToSet: {movieWriter: movie._id}}

    )
}

await connectMovieToActor(casino,stone);
await connectMovieToActor(casino,jack);
await connectMovieToActor(casino,deNiro);
await connectMovieToWriter(casino,scorsese);
await connectMovieToWriter(casino,pilegii);


const user1 = await User.create({
    name: 'Ola',
    surname: 'Kowalska',
    email: 'ola.kowlska@wp.pl'
})

const review1 = await Review.create({
    user: user1,
    movie: casino,
    body: 'dobry film',
    score: 5
})

const user2 = await User.create({
    name: 'Adam',
    surname: 'Adamczyk',
    email: 'adam.adamczyk@wp.pl'
})

const review2 = await Review.create({
    user: user2,
    movie: casino,
    body: 'może być ',
    score: 4
})

async function connectMovieToReview(movie,review) {
    await Movie.findByIdAndUpdate(
        movie._id,
        {$addToSet: {reviews: review._id}}
    );
    await Review.findByIdAndUpdate(
        {_id: review._id},
        {movie: movie._id}
    );
}

await connectMovieToReview(casino, review1);
await connectMovieToReview(casino, review2);

const movieDb = await Movie.find({}).populate([{
    path: "director"
},{
    path: 'actors'
},{
    path: 'writers'
},{
    path: 'reviews',
    populate: {
        path: 'user'
    }
}]);

console.log(JSON.stringify(movieDb, null , 4));