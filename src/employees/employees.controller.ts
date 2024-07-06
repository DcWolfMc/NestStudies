import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Ip,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Prisma } from '@prisma/client';
import { Throttle, SkipThrottle } from '@nestjs/throttler';
import { LoggerService } from 'src/logger/logger.service';

// To skip throttle to the full controller, just place the SkipThrottle here,
// at top of controller.
SkipThrottle();
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}
  //to have logs for especifics controllers, use this line:
  private readonly logger = new LoggerService(EmployeesController.name);

  @Post()
  create(
    @Ip() ip: string,
    @Body() createEmployeeDto: Prisma.EmployeeCreateInput,
  ) {
    this.logger.log(
      `Resquest for ALL Employees\t ${ip}`,
      EmployeesController.name,
    );
    return this.employeesService.create(createEmployeeDto);
  }

  // To apply the throttle to a especific route, use the comand below.
  @SkipThrottle({ default: false })
  @Get()
  findAll(
    @Ip() ip: string,
    @Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN',
  ) {
    this.logger.log(
      `Resquest for ALL Employees\t ${ip}`,
      EmployeesController.name,
    );
    return this.employeesService.findAll(role);
  }

  // to reconfigure the throttle, use Throttle at top of the route.
  @Throttle({ short: { ttl: 1000, limit: 1 } })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: Prisma.EmployeeUpdateInput,
  ) {
    return this.employeesService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeesService.remove(+id);
  }
}
