import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RequestWithUser } from './jwt.strategy';
import { UserService } from '../user/user.service';

export type AuthBody = { email: string; password: string };
export type CreateUser = { email: string; firstName: string; password: string };
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
  //localhost:3000/auth/login
  @Post('login')
  async login(@Body() authBody: AuthBody) {
    return await this.authService.login({
      authBody,
    });
  }

  @Post('register')
  async register(@Body() createUser: CreateUser) {
    return await this.authService.register({ registerBody: createUser });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async authenticate(@Req() request: RequestWithUser) {
    // console.log(request.user.userId);
    return await this.userService.getUser({ userId: request.user.userId });
  }
}
