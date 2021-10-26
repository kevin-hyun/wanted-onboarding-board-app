import { BoardStatus } from './../board-status.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateBoardDto {
  @ApiProperty({
    description: '글 제목',
    default: 'New 게시글 제목',
    required: false,
  })
  @IsOptional()
  title: string;

  @ApiProperty({
    description: '글 내용',
    default: 'New 게시글 내용',
    required: false,
  })
  @IsOptional()
  description: string;

  @ApiProperty({
    description: '공개글/비공개글',
    default: 'PUBLIC',
    required: false,
  })
  @IsOptional()
  status: BoardStatus;
}
