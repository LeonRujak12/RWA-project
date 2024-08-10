import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo, TodoDocument } from './schema/items.schema';
import { CreateTodoDto } from './dto/create-item.dto';
import { UpdateTodoDto } from './dto/update-item.dto';

@Injectable()
export class ItemsService {
    constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

    async create(createTodoDto: CreateTodoDto): Promise<Todo> {
        const newTodo = new this.todoModel(createTodoDto);
        return newTodo.save();
    }

    async findAll(): Promise<Todo[]> {
        return this.todoModel.find().exec();
    }

    async findOne(id: string): Promise<Todo> {
        const todo = await this.todoModel.findById(id).exec();
        if (!todo) {
            throw new NotFoundException(`Todo with ID ${id} not found`);
        }
        return todo;
    }

    async update(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
        const updatedTodo = await this.todoModel
            .findByIdAndUpdate(id, updateTodoDto, { new: true })
            .exec();
        if (!updatedTodo) {
            throw new NotFoundException(`Todo with ID ${id} not found`);
        }
        return updatedTodo;
    }

    async remove(id: string): Promise<Todo> {
        const updatedTodo = await this.todoModel
            .findByIdAndDelete(id)
            .exec();
        if (!updatedTodo) {
            throw new NotFoundException(`Todo with ID ${id} not found`);
        }
        return updatedTodo;
    }

    async findCompleted(): Promise<Todo[]> {
        return this.todoModel.find({ isCompleted: true }).exec();
    }

    async findNotCompleted(): Promise<Todo[]> {
        return this.todoModel.find({ isCompleted: false }).exec();
    }
}
