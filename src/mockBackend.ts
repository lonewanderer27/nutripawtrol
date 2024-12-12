import { createServer } from "miragejs";
import { PET_ALLERGIES, PETS } from "./constants";
import { ProductType, SuggestRequestBody } from "./types";

const randomSpecie = () => {
  return PETS[Math.floor(Math.random() * PETS.length)];
};

const randomAllergies = (specie: string) => {
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

const randomAllergy = (specie: string) => {
  return randomAllergies(specie)[0];
};

const randomSpecieAndAllergies = () => {
  const pet = randomSpecie();
  const allergies = randomAllergies(pet);
  return { pet, allergies };
};

const randomPetAndAllergy = () => {
  const pet = randomSpecie();
  const allergy = randomAllergy(pet);
  return { pet, allergy };
};

function mockBackend() {
  return createServer({
    routes() {
      this.post("/llm", () => {
        // decide randomly how many results to return, max 6
        const numResults = Math.floor(Math.random() * 6) + 1;

        // generate the results
        const results = [];

        for (let i = 0; i < numResults; i++) {
          results.push(randomPetAndAllergy());
        }

        return {
          output: results,
        };
      });
      this.post("/suggest", (schema, request) => {
        const {
          num,
          "no-csv": noCsv,
          list,
        } = JSON.parse(request.requestBody) as SuggestRequestBody;

        if (noCsv) {
          const recommendList: number[][] = [];
          list.forEach((x) => {
            const items = Array.from({ length: num }).map(() => {
              return Math.floor(Math.random() * 88888) + 11111;
            });
            recommendList.push(items);
          });

          return {
            recommend: recommendList
          };

          // sample output:
          // recommend: [
          //   [12345, 23456, 34567],
          //   [45678, 56789, 67890],
          //   [78901, 89012, 90123]
          // ]
        }

        const recommendList: ProductType[][] = [];
        list.forEach((x) => {
          const products = Array.from({ length: num }).map(() => {
            return {
              main_category_en: x.pet,
              image_url: "/product_placeholder.png",
              product_name: "Product name",
              allergens: x.allergy,
              ingredients_text: "Ingredients text...",
              url: "https://www.kaytee.com/all-products/wild-bird/birders-blend",
            } as ProductType;
          });
          recommendList.push(products);
        });

        return {
          recommend: recommendList,
        };

        // sample output:
        // recommend: [
        //   [
        //     {
        //       main_category_en: "dog",
        //       image_url: "/product_placeholder.png",
        //       product_name: "Product name",
        //       allergens: "allergy",
        //       ingredients_text: "Ingredients text...",
        //       url: "https://www.kaytee.com/all-products/wild-bird/birders-blend",
        //     }, 
        //     ...
        //   ],
        //   ...
        // ]
      });
    },
  });
}

export default mockBackend;
