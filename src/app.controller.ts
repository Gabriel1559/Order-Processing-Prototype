import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  
 @Get('byee')
  getOrders(): string {
    return this.appService.getOrders().toString();
  }

  @Post('save-orders') // Saves parsed orders to DB
    async saveOrders() { 
      return await this.appService.saveOrders(); 
}
      

}
