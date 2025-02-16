import mongoose from "mongoose";

const url = 'mongodb://127.0.0.1:27017/mongoosetest';

mongoose.connect(url);

const studentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,
        maxLength: 32
    },
    lastname: {
        type: String,
        required: false,
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
        validator: function(text){
            return text.indexOf("@") > 0;
        }
    },
    address:{
        street: {
            type: String,
            required: false,
            trim: true,
            minLength: 1,
            maxLength: 32
        },
        city: {
            type: String,
            required: false,
            trim: true,
            minLength: 1,
            maxLength: 32,
            enum: ["wawa","krk","gd"]
        }
    },
    
    linkedin: {
        type: String,
        required: false,
        validate: {
            validator: function(txt){
                return txt.indexOf('https://www.linkedin.com')>=0;
            },
            message: 'Student adres powinien zaczynac sie od https://www.linkedin.com'
        }
    },
    created: {
        type: Date,
        default: Date.now
    }
});

const Student = mongoose.model("Student",studentSchema);
const sutdent1 = new Student({
    _id: new mongoose.Types.ObjectId(),
    firstName: 'Olga',
    lastName: "kowal",
    email: 'olaKowal@',
    address: {
        street: 'wilcza 7',
        city: "wawa"
    },
    linkedin: "https://www.linkedin.com/user"
});


let validationErrors = sutdent1.validateSync();
//console.log(validationErrors);

if(validationErrors && validationErrors.errors['address.city']){
    console.log(validationErrors.errors['address.city'].message);//opis błedu
    console.log(validationErrors.errors['address.city'].path);//address.city
    console.log(validationErrors.errors['address.city'].value);//błędna wartość
}

if(validationErrors){
    if(validationErrors.name == 'ValidationError'){
        const field = Object.keys(validationErrors.errors)[0];
        console.log('validatnio e',validationErrors.errors[field]);
    }
}

try{
    sutdent1.validate();//3 sposób na zwalidowanie naszego modelu 
    await Student.deleteMany({email: "olaKowal@"});

    let studentFromDb = await sutdent1.save();
    
    //studentFromDb.address.city = 'Olsztyn';
    //studentFromDb.save();
}catch(err){
    console.log("save catch error", err.message)
}