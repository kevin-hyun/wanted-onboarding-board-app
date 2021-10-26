import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @ApiProperty({ description: '페이지', default: 1, required: true })
  page: number;

  @ApiProperty({
    description: '1페이지에서 보여지는 게시글 수 ',
    default: 10,
    required: true,
  })
  limit: number;
}
