import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VisitorsService } from './visitors.service';
import { VisitorsController } from './visitors.controller';
import { Visitor, VisitorSchema } from './schemas/visitor.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Visitor.name, schema: VisitorSchema }]),
  ],
  controllers: [VisitorsController],
  providers: [VisitorsService],
})
export class VisitorsModule {}
