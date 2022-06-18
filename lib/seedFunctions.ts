import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

export const generateFakeUser = async (n: number) => {
  const result = [];

  for (let i = 0; i < n; i++) {
    let firstName = faker.name.firstName();
    let lastName = faker.name.lastName();
    let email = faker.internet.email(firstName, lastName);
    let fullName = `${firstName} ${lastName} `;
    const hashedPassword = await bcrypt.hash('password', 10);

    result.push({ email, password: hashedPassword, name: fullName });
  }

  return result;
};
