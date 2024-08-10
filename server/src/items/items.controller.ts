import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateTodoDto } from './dto/create-item.dto';
import { UpdateTodoDto } from './dto/update-item.dto';
import { Todo } from './schema/items.schema';

@Controller('todos')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) {}

    @Post()
    create(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
        return this.itemsService.create(createTodoDto);
    }

    @Get()
    findAll(): Promise<Todo[]> {
        return this.itemsService.findAll();
    }

    @Get('completed')
    findCompleted(): Promise<Todo[]> {
        return this.itemsService.findCompleted();
    }

    @Get('not-completed')
    findNotCompleted(): Promise<Todo[]> {
        return this.itemsService.findNotCompleted();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Todo> {
        return this.itemsService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto): Promise<Todo> {
        return this.itemsService.update(id, updateTodoDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<Todo> {
        return this.itemsService.remove(id);
    }
}
