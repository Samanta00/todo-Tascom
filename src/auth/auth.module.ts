import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  
  imports:[JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      secret: configService.getOrThrow('JWT_SECRET_KEY'),
      signOptions: {
        expiresIn: '7d',
      },
    }),
  })],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
