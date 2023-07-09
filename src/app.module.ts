import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProblemsModule } from './problems/problems.module';

@Module({
  imports: [ConfigModule.forRoot(), ProblemsModule],
})
export class AppModule {}
