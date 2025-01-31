/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios from 'axios';
import { Visitor } from './schemas/visitor.schema';

@Injectable()
export class VisitorsService {
  constructor(@InjectModel(Visitor.name) private visitorModel: Model<Visitor>) {}

  // Fetch country using an external IP Geolocation API
  private async getCountryFromIP(ip: string): Promise<string> {
    try {
      if (ip === '::1' || ip === '127.0.0.1') {
        console.log(ip)
        return 'Localhost'; // Handle local development cases
      }
      const response = await axios.get(`http://ip-api.com/json/${ip}`);
      const data: { country?: string } = response.data;
      return data.country || 'Unknown';
    } catch (error) {
      console.error('Error fetching country:', error);
      return 'Unknown';
    }
  }

  // Record a visitor with country data
  async addVisitor(ip: string): Promise<Visitor> {
    console.log(ip)
    const country = await this.getCountryFromIP(ip);
    const visitor = new this.visitorModel({ ip, country });
    return visitor.save();
  }

  // Get total count of visitors
  async getVisitorCount(): Promise<number> {
    return this.visitorModel.countDocuments();
  }

  // Get visitor locations
  async getVisitorLocations(): Promise<{ country: string; count: number }[]> {
    return this.visitorModel.aggregate([
      { $group: { _id: '$country', count: { $sum: 1 } } },
      { $project: { country: '$_id', count: 1, _id: 0 } },
    ]);
  }
}
