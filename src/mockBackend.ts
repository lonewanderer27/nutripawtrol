import { createServer } from "miragejs";
import { pet_allergies, pets } from "./constants";

const randomSpecie = () => {
  return pets[Math.floor(Math.random() * pets.length)];
};

const randomAllergy = (specie: string) => {
  // get the food_allergeis for the specie
  let foodAllergies: string[] = [];
  switch (specie) {
    case "dog":
      foodAllergies = pet_allergies.dog.food_allergies;
      break;
    case "cat":
      foodAllergies = pet_allergies.cat.food_allergies;
      break;
    case "rabbit":
      foodAllergies = pet_allergies.rabbit.food_allergies;
      break;
    case "hamster":
      foodAllergies = pet_allergies.hamster.food_allergies;
      break;
    case "parrot":
      foodAllergies = pet_allergies.parrot.food_allergies;
      break;
    case "goldfish":
      foodAllergies = pet_allergies.goldfish.food_allergies;
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
  const specie = randomSpecie();
  const allergies = randomAllergy(specie);
  return { specie, allergies };
};

function mockBackend() {
  return createServer({
    routes() {
      this.namespace = "api";
      this.get("/v1", () => {
        // decide randomly how many results to return, max 3
        const numResults = Math.floor(Math.random() * 3) + 1;

        // generate the results
        const results = [];

        for (let i = 0; i < numResults; i++) {
          results.push(randomSpecieAndAllergy());
        }

        return results;
      });
    },
  });
}

export default mockBackend;
