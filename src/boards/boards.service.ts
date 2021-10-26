import { UpdateBoardDto } from './dto/update-board.dto';
import { PaginatedBoardsResultDto } from './dto/PaginationBoardsResult.dto';
import { PaginationDto } from './dto/pagination.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  async getAllBoards(
    user: User,
    paginationDto: PaginationDto,
  ): Promise<PaginatedBoardsResultDto> {
    const skippedItems = (paginationDto.page - 1) * paginationDto.limit;
    const totalCount = await this.boardRepository.count();

    const query = this.boardRepository.createQueryBuilder('board');

    query
      .where('board.userId = :userId', { userId: user.id })
      .offset(skippedItems)
      .limit(paginationDto.limit);

    const boards = await query.getMany();

    return {
      totalCount,
      page: paginationDto.page,
      limit: paginationDto.limit,
      data: boards,
    };
  }

  createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto, user);
  }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    return found;
  }

  async deleteBoard(id: number, user: User): Promise<void> {
    const result = await this.boardRepository.delete({ id, user });

    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
  }

  async updateBoardStatus(
    id: number,
    updateBoardDto: UpdateBoardDto,
  ): Promise<Board> {
    const { title, description, status } = updateBoardDto;
    const boardData = {
      id,
      title,
      description,
      status,
    };
    console.log(boardData);
    await this.boardRepository.save(boardData);

    return this.getBoardById(id);
  }
}
