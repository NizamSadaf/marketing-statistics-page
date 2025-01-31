/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body } from '@nestjs/common';
import { VisitorsService } from './visitors.service';

@Controller('visitors')
export class VisitorsController {
  constructor(private readonly visitorsService: VisitorsService) {}

  // POST: Add a visitor with country tracking
  @Post()
  async addVisitor(@Body('ip') ip: string) {

    console.log('Received IP:', ip); // Another way to log in the console

    if (!ip) {
      return { error: 'IP address is required' };
    }

    const visitor = await this.visitorsService.addVisitor(ip);
    return { message: 'Visitor added successfully!', visitor };
  }

  // GET: Get total visitor count
  @Get('count')
  async getVisitorCount() {
    const count = await this.visitorsService.getVisitorCount();
    return { count };
  }

  // GET: Get visitor locations
  @Get('locations')
  async getVisitorLocations() {
    const locations = await this.visitorsService.getVisitorLocations();
    return { locations };
  }
}
