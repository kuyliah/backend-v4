import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { User } from 'src/types/user';

import { UserService } from '../shared/user.service';
import { Payload } from '../types/payload';
import { LoginDTO, RegisterDTO } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() userDTO: LoginDTO) {
    const user = await this.userService.findByLogin(userDTO);
    const payload: Payload = {
      email: user.email,
      student: user.student,
      membership: user.membership
    };
    const token = await this.authService.signPayload(payload);
    return { user, token };
  }

  @Post('register')
  async register(@Body() userDTO: RegisterDTO) {
    const user = await this.userService.create(userDTO);
    const payload: Payload = {
      email: user.email,
      student: user.student,
      membership: user.membership
    };
    const token = await this.authService.signPayload(payload);
    return { user, token };
  }

  @Get('user/:id')
  findOne(@Param('id') id): Promise<User> {
    return this.userService.findOne(id);
  }

  @Get('users')
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
}
