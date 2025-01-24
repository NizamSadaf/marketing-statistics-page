/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Visitor } from './schemas/visitor.schema';

@Injectable()
export class VisitorsService {
  constructor(@InjectModel(Visitor.name) private visitorModel: Model<Visitor>) {}

  // Record a visitor
  async addVisitor(ip: string): Promise<Visitor> {
    const visitor = new this.visitorModel({ ip });
    return visitor.save();
  }

  // Get total count of visitors
  async getVisitorCount(): Promise<number> {
    return this.visitorModel.countDocuments();
  }
}
