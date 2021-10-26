import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from './base.response';

export abstract class LoginResponseData {
  @ApiProperty()
  accesstoken: string;
}
export abstract class LoginResponse extends BaseResponse {
  constructor() {
    super();
  }
  @ApiProperty()
  data: LoginResponseData;
}
