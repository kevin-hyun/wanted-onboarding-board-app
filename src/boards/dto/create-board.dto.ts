import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateBoardDto {
  @ApiProperty({
    description: '글 제목',
    default: '게시글 제목',
    required: true,
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: '글 내용',
    default: '게시글 내용',
    required: true,
  })
  @IsNotEmpty()
  description: string;
}
