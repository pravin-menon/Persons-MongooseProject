const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/people', {useNewUrlParser: true, useUnifiedTopology: true});

const fruitSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: [true, "Please specify a name!"],
        unique: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});

const personsSchema = new mongoose.Schema ({
    name: String,
    age: Number,
    favouriteFruit: fruitSchema
})

const Person = mongoose.model('Person', personsSchema);

// const person = new Person({ name: "John", age: 37});

const Fruit = mongoose.model("Fruit", fruitSchema);

// const fruit = new Fruit({name: "Grapes", rating: 1, review: "Causes allergies"});
const pineapple = new Fruit({name: "Pineapple", rating: 6, review: "Good fruit"});
const mango = new Fruit({name: "Mango", rating: 10, review: "The best fruit ever!"});

pineapple.save();
mango.save();

const person = new Person({ name: "Amy", age: 12, favouriteFruit: pineapple});
person.save();

// Fruit.insertMany([{name: "Apple", rating: 4, review: "causes Salicylate poisoning"}, {name: "Banana", rating: 9, review: "Best for tummy!"}, {name: "Orange", rating: 8, review: "Great source of Vit C"}], (err) => {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log("Successfully saved");
//     }
// });

// fruit.save();

Person.find((err, people) => {
    if(err) {
        console.log(err);
    } else {
        // mongoose.connection.close();
        people.forEach(item => {
            console.log(item.name);
        });
    }
});



Person.updateOne({name: "John"}, {favouriteFruit: mango}, (err) => {
    if(err) {
        console.log(err);
    } else {
        console.log("Updated document successfully");
    }
});

// Fruit.deleteOne({ name: 'Raisins' }, function (err) {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log("Deleted document successfully");
//     }
//   });

  Fruit.find((err, fruits) => {
    if(err) {
        console.log(err);
    } else {
        mongoose.connection.close();
        fruits.forEach(item => {
            console.log(item.name);
        });
    }
});

// Mongo commands
// show dbs
// use "db"
// show collections
// db.collection.find()
// db.collection.count()
// db.dropDatabase()