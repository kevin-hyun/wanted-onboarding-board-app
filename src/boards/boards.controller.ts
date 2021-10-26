import { PaginatedBoardsResultDto } from './dto/PaginationBoardsResult.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Put,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { PaginationDto } from './dto/pagination.dto';
import { BoardStatusValidationPipe } from './pipe/board-status-validation.pipe';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { UpdateBoardDto } from './dto/update-board.dto';

@Controller('boards')
@ApiBearerAuth('accesskey')
@ApiTags('게시판 CRUD API')
@UseGuards(AuthGuard())
export class BoardsController {
  private logger = new Logger('Boards');
  constructor(private boardsService: BoardsService) {}

  //   @Get()
  //   getAllBoard(@GetUser() user: User): Promise<Board[]> {
  //     this.logger.verbose(`User ${user.username} trying to get all boards`);
  //     return this.boardsService.getAllBoards(user);
  //   }

  @Get()
  @ApiOperation({
    summary: '모든 게시물 조회',
    description: '로그인한 유저의 모든 게시글을 조회한다',
  })
  getAllBoard(
    @GetUser() user: User,
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginatedBoardsResultDto> {
    this.logger.verbose(`User ${user.username} trying to get all boards`);
    return this.boardsService.getAllBoards(user, {
      ...paginationDto,
      limit: paginationDto.limit > 10 ? 10 : paginationDto.limit,
    });
  }

  @Post()
  @ApiOperation({
    summary: '게시글 작성',
    description: 'body에 담긴 정보를 바탕으로 게시글을 작성한다',
  })
  @UsePipes(ValidationPipe)
  createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user: User,
  ): Promise<Board> {
    this.logger.verbose(`User ${user.username} creating a new board. 
        Payload: ${JSON.stringify(createBoardDto)} `);
    return this.boardsService.createBoard(createBoardDto, user);
  }

  @Get('/:id')
  @ApiOperation({
    summary: '한 게시글 조회',
    description: '게시글 id로 특정 게시글을 조회한다',
  })
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }

  @Delete('/:id')
  @ApiOperation({
    summary: '게시글 삭제',
    description: '게시글 id로 특정 게시글을 삭제한다',
  })
  deleteBoard(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.boardsService.deleteBoard(id, user);
  }

  @Put('/:id')
  @ApiOperation({
    summary: '게시글 변경',
    description: 'body에 담긴 정보를 바탕으로 게시글을 변경한다',
  })
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBoardDto: UpdateBoardDto,
  ) {
    return this.boardsService.updateBoardStatus(id, updateBoardDto);
  }
}
