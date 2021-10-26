import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { LoginResponse } from 'src/swagger/login.response';

import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';

@Controller('auth')
@ApiTags('회원가입/인증')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @ApiOperation({
    summary: '회원가입',
    description: 'username, password로 회원가입을 한다',
  })
  signUp(
    @Body(ValidationPipe) authcredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    return this.authService.signUp(authcredentialsDto);
  }

  @ApiCreatedResponse({ description: '성공', type: LoginResponse })
  @Post('/signin')
  @ApiOperation({
    summary: '인증',
    description: 'username, password로 로그인을 진행한다',
  })
  signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }
}
