import { Request, Response } from "express";
import { AuthService } from "../services/auth-service";

const authService = new AuthService();

export class AuthController {
  static async signup(req: Request, res: Response) {
    const { email } = req.body;
    const user = await authService.signup(email);
    res.status(201).send(user);
  }
}
