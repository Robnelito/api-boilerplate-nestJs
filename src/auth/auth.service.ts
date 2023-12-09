import { Injectable } from '@nestjs/common';
import { AuthBody } from './auth.controller';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}
  async login({ authBody }: { authBody: AuthBody }) {
    const { email, password } = authBody;
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!existingUser) throw new Error("L'utilisateur n'existe pas!");

    const isPasswordSame = password === existingUser.password;

    if (!isPasswordSame) throw new Error('Le mot de passe et incorrect');

    return existingUser;
  }
}
