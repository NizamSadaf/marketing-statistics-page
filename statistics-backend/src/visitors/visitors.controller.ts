/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Ip } from '@nestjs/common';
import { VisitorsService } from './visitors.service';

@Controller('visitors') // This maps the base path `/visitors`
export class VisitorsController {
  constructor(private readonly visitorsService: VisitorsService) {}

  // POST: Add a visitor
  @Post()
  async addVisitor(@Ip() ip: string) {
    await this.visitorsService.addVisitor(ip);
    return { message: 'Visitor added successfully!' };
  }

  // GET: Test endpoint for returning all visitors (or a test response)
  @Get()
  findAll(): string {
    console.log('GET /visitors called'); // Add a log to check execution
    return 'This action returns all visitors'; // Simple string response
  }

  // GET: Visitor count
  @Get('count')
  async getVisitorCount() {
    const count = await this.visitorsService.getVisitorCount();
    return { count };
  }
}
