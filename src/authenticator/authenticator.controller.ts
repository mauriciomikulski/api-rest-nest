import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthenticatorService } from './authenticator.service';

@Controller('auth')
export class AuthenticatorController {
  constructor(private readonly authenticatorService: AuthenticatorService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() user: any) {
    return await this.authenticatorService.login(user);
  }
}
