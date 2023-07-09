import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProblemsService } from './problems.service';

@Controller('problems')
export class ProblemsController {
  constructor(private _problemsService: ProblemsService) {}

  @MessagePattern({ cmd: 'problem' })
  async solve(@Payload() data: number[]) {
    console.log('successfully', data);

    return this._problemsService.solve(data);
  }
}
