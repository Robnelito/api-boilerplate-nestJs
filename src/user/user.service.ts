import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Query } from './user.controller';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async getUsers() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
      },
    });
  }

  async getUser({ userId }: { userId: string }) {
    return this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
      },
    });
  }

  async searchUsers({ requestBody }: { requestBody: Query }) {
    // return requestBody;
    return this.prisma.user.findMany({
      where: {
        firstName: { contains: requestBody.query },
      },
      select: {
        id: true,
        email: true,
        firstName: true,
      },
    });
  }
}
