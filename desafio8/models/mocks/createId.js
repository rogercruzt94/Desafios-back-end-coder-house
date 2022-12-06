import { faker } from "@faker-js/faker";

export default async function createId() {
  const id = faker.database.mongodbObjectId();

  return id;
}
