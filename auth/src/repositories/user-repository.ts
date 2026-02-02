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
}
