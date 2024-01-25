require('dotenv').config();
const mongoURI = process.env.MONGO_URI;
const mongoose = require('mongoose');

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: 
  {
    type: String,
    required: true
  },
  age: {
    type: Number
  },
  favoriteFoods: {
    type: [String]
  }
});

let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  new Person({
    name: "Pablo Marçal",
    age: 36,
    favoriteFoods: ["Arroz", "Strogonoff"]
  }).save((err, data) => {
    return err ? done(err) : done(null , data);
  })
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    return err ? done(err) : done(null, data);
  });
}; 

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, data) => {
      return err ? done(err) : done(null, data);
    });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, data) => {
      return err ? done(err) : done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    return err ? done(err) : done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, data) => {
    err ? done(err) : (
      data.favoriteFoods.push(foodToAdd),
      data.save((err, data) => {
        err ? done(err) : done(null, data);
      })
    );
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  
  Person.findOneAndUpdate(
    {name: personName},
    {age: ageToSet},
    {new: true},
    (err, updatedPerson) => {
      err ? done(err) : done(null, updatedPerson);
    }
  );
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    err ? done(err) : done(null, data);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, data) => {
    err ? done(err) : done(null, data);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 }) 
    .limit(2)
    .select({ age: 0 })
    .exec((err, data) => {
      done(err, data);
    });
};

/*
createAndSavePerson((err, data) => {
  err ? console.log(err) : console.log(data);
});
*/

const arrayOfPeople = [
  { name: "Zezinho da Silva", age: 28, favoriteFoods: ["Feijoada", "Coxinha"] },
  { name: "Xuxa Meneghel", age: 50, favoriteFoods: ["Açaí", "Pão de Queijo"] },
  { name: "Tiririca dos Santos", age: 45, favoriteFoods: ["Churrasco", "Caipirinha"] },
  { name: "Graciliano Ramos Junior", age: 35, favoriteFoods: ["Moqueca", "Farofa"] },
  { name: "Magali Menezes", age: 27, favoriteFoods: ["Brigadeiro", "Pastel"] }
];

/*
createManyPeople(arrayOfPeople, (err, data) => {
  err ? console.log("Error:", err) : console.log("People saved successfully:", data);
});
*/

const personName = "Pablo Marçal";

findPeopleByName(personName, (err, data) => {
  err ? console.log("Error:", err) : console.log("People found:", data);
});

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
