import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TodoDocument = Todo & Document;

@Schema()
export class Todo {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    projectName: string;

    @Prop({ required: true, default: false })
    isCompleted: boolean;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
