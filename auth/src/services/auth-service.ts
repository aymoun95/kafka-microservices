import { UserCreatedProducer } from "../events/producers/user-created-producer";
import { User, UserRepository } from "../repositories/user-repository";

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async signup(email: string) {
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
    };

    await this.userRepository.create(user);

    await UserCreatedProducer.publish({
      email: user.email,
      timestamp: new Date(),
    });

    return user;
  }
}
