import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { GenreService } from './genre.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('genre')
@ApiTags('Genre CRUD API')
@UsePipes(new ValidationPipe({ transform: true, forbidNonWhitelisted: true }))
export class GenreController {
    constructor(private readonly service: GenreService){}
}
