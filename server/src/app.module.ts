import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://kikileonbvb:dS9EKwGe20hZc2SS@cluster0.7n9n9.mongodb.net/nestjs-demo?retryWrites=true&w=majority&appName=Cluster0'),
    ItemsModule,
  ],
})
export class AppModule {}
