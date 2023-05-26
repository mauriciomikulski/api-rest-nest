import { Module } from '@nestjs/common';
import { AuthenticatorController } from './authenticator.controller';
import { AuthenticatorService } from './authenticator.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { EncryptorModule } from 'src/encryptor/encryptor.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'secretKey',
      signOptions: { expiresIn: '1d' },
    }),
    UsersModule,
    EncryptorModule,
  ],
  providers: [AuthenticatorService],
  controllers: [AuthenticatorController],
  exports: [AuthenticatorService],
})
export class AuthenticatorModule {}
