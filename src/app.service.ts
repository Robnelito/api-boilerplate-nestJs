import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getUsers() {
    return {
      id: 1,
      firstname: 'Virgile',
    };
  }
}
