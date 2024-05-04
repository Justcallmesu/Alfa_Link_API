import { Module } from '@nestjs/common';

// Controller
import { CustomerController } from './customer.controller';

// Service
import { CustomerService } from './customer.service';

@Module({
  imports: [],
  controllers: [CustomerController],
  providers: [CustomerService],
  exports: [],
})
export class CustomerModule {}
