import { faker } from "@faker-js/faker";

export default function createNFakeProducts(n = 5) {
  let products = [];
  for (let i = 0; i < n; i++) {
    products.push({
      id: faker.database.mongodbObjectId(),
      name: faker.vehicle.vehicle(),
      price: faker.commerce.price(10000, 20000, 0, "$"),
      thumbnail: faker.image.avatar(),
    });
  }
  return products;
}
