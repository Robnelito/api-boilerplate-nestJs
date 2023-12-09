import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';

export type Query = { query: string };
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  getUsers(): object {
    return this.userService.getUsers();
  }

  @Get('/:userId')
  getUser(@Param('userId') userId: string): object {
    return this.userService.getUser({
      userId,
    });
  }

  @Post('search')
  async searchUser(@Body() query: Query) {
    return this.userService.searchUsers({ requestBody: query });
  }
}
