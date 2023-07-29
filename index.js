const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://127.0.0.1:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })

  .then(() => {
    return Recipe.create({
      title: "Mondongo",
      level: "Amateur Chef",
      ingredients: [
        "3 1/2 pounds boneless pork shoulder, cut into large pieces",
        "1 tablespoon freshly ground black pepper",
        "1 tablespoon kosher salt, or more to taste",
      ],
      cuisine: "American",
      dishType: "main_course",
      image:
        "https://images.media-allrecipes.com/userphotos/720x405/2280918.jpg",
      duration: 160,
      creator: "Chef John",
    }).then(() => console.log("Receta propia creada"));
  })
  .then(() => {
    console.log("Todo borrado");
    Recipe.insertMany(data)
      .then((insertedRecipes) => {
        console.log(`${insertedRecipes.length} recetas insertadas.`);
        return insertedRecipes.forEach((x) => console.log(x.title));
      })

      .then(() => {
        const update = Recipe.findOneAndUpdate(
          { title: "Rigatoni alla Genovese" },
          { duration: 100 }
        );
        return update;
      })

      .then(() => {
        return Recipe.deleteOne({ title: "Carrot Cake" });
      })
      .then(() => {
        console.log("Ta to actualizao diego");
      })
      .then(() => {
       return mongoose.connection.close()
      })
      .catch((error) => {
        console.error("Error connecting to the database", error);
      });
  });
