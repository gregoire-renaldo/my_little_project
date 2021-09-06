const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Boat = require('./../models/Boat');


dotenv.config({ path: '../.env' });


mongoose.connect(process.env.DATABASE,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));



// READ JSON FILE
const boats = JSON.parse(fs.readFileSync(`${__dirname}/boats.json`, 'utf-8'));


// IMPORT DATA INTO DB
const importData = async () => {
  console.log('starting to import boats')
  try {
    await Boat.create(boats);
    // await User.create(users, { validateBeforeSave: false });
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Boat.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
