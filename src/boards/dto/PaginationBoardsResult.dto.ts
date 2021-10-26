import { Board } from '../board.entity';

export class PaginatedBoardsResultDto {
  data: Board[];
  page: number;
  limit: number;
  totalCount: number;
}
