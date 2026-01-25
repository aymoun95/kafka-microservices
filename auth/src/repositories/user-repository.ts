export interface User {
  id: string;
  email: string;
}

const users: User[] = [];

export class UserRepository {
  async create(user: User): Promise<User> {
    users.push(user);
    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return users.find((u) => u.email === email);
  }
}
