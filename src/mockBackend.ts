import { createServer } from "miragejs";
import { PET_ALLERGIES, PETS } from "./constants";
import { ProductType, SuggestRequestBody } from "./types";

const randomSpecie = () => {
  return PETS[Math.floor(Math.random() * PETS.length)];
};

const randomAllergy = (specie: string) => {
  // get the food_allergeis for the specie
  let foodAllergies: string[] = [];
  switch (specie) {
    case "dog":
      foodAllergies = PET_ALLERGIES.dog.food_allergies;
      break;
    case "cat":
      foodAllergies = PET_ALLERGIES.cat.food_allergies;
      break;
    case "rabbit":
      foodAllergies = PET_ALLERGIES.rabbit.food_allergies;
      break;
    case "hamster":
      foodAllergies = PET_ALLERGIES.hamster.food_allergies;
      break;
    case "parrot":
      foodAllergies = PET_ALLERGIES.parrot.food_allergies;
      break;
    case "goldfish":
      foodAllergies = PET_ALLERGIES.goldfish.food_allergies;
      break;
  }

  // decide randomly how many food allergies to return, min 1, max 3
  const numAllergies = Math.floor(Math.random() * 3) + 1;

  // get the food allergies
  const allergies = [];

  for (let i = 0; i < numAllergies; i++) {
    allergies.push(
      foodAllergies[Math.floor(Math.random() * foodAllergies.length)]
    );
  }

  return allergies;
};

const randomSpecieAndAllergy = () => {
  const pet = randomSpecie();
  const allergies = randomAllergy(pet);
  return { pet, allergies };
};

function mockBackend() {
  return createServer({
    routes() {
      this.post("/llm", () => {
        // decide randomly how many results to return, max 3
        const numResults = Math.floor(Math.random() * 3) + 1;

        // generate the results
        const results = [];

        for (let i = 0; i < numResults; i++) {
          results.push(randomSpecieAndAllergy());
        }

        return {
          output: results,
        };
      });
      this.post("/suggest", (schema, request) => {
        const { num, "no-csv": noCsv } = JSON.parse(request.requestBody) as SuggestRequestBody;
        
        if (noCsv) {
          // randomly decide (num) of numbers between 0 and 9
          const productIndexes = Array.from({ length: num }).map(() => {
            return Math.floor(Math.random() * 10);
          });

          return productIndexes;
        }

        // how many results to return
        const products = Array.from({ length: num }).map(() => {
          return {
            main_category_en: "dog food",
            image_url: "/product_placeholder.png",
            product_name: "Pedigree",
            allergens: "Allergens list...",
            ingredients_text: "Dog food that has no absolutely peanut in it",
            url: "https://www.kaytee.com/all-products/wild-bird/birders-blend"
          } as ProductType;
        });

        return products;
      });
    },
  });
}

export default mockBackend;
