import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Query } from './user.controller';

let PrismaUserDataSelect = {
  id: true,
  email: true,
  firstName: true,
}
@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async getUsers() {
    return this.prisma.user.findMany({
      select: PrismaUserDataSelect,
    });
  }

  async getUser({ userId }: { userId: string }) {
    return this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: PrismaUserDataSelect,
    });
  }

  async searchUsers({ requestBody }: { requestBody: Query }) {
    // return requestBody;
    return this.prisma.user.findMany({
      where: {
        firstName: { contains: requestBody.query },
      },
      select: PrismaUserDataSelect,
    });
  }
}
