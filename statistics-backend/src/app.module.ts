/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VisitorsModule } from './visitors/visitors.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/visitorCounter'),
    VisitorsModule,
  ],
})
export class AppModule {}
