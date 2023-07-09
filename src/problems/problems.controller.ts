import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { ProblemsService } from './problems.service';

@Controller('problems')
export class ProblemsController {
  constructor(private _problemsService: ProblemsService) {}

  @MessagePattern({ cmd: 'problem' })
  async solve(@Payload() data: number[], @Ctx() context: RmqContext) {
    console.log('successfully', data);

    return this._problemsService.solve(data, context);
  }
}
