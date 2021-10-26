import { IsNumber } from 'class-validator';

export class PaginationDto {
  page: number;

  limit: number;
}
