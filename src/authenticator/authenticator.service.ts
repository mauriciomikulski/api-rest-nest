import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { EncryptorService } from 'src/encryptor/encryptor.service';

@Injectable()
export class AuthenticatorService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly encryptorService: EncryptorService,
    private readonly userService: UsersService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const found = await this.userService.findOneByEmail(user.email);
    if (!found) throw new Error('Invalid credentials');
    const userMatch = await this.encryptorService.compare(
      user.password,
      found.password,
    );
    if (!userMatch) throw new Error('Invalid credentials');
    const payload = { email: user.email, sub: user.id };
    return {
      email: user.email,
      expiration: '1d',
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
