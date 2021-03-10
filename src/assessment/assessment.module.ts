import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AssessmentSchema } from '../models/assessment.schema';
import { SharedModule } from '../shared/shared.module';
import { AssessmentController } from './assessment.controller';
import { AssessmentService } from './assessment.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Assessment', schema: AssessmentSchema }]),
    SharedModule,
  ],
  providers: [AssessmentService],
  controllers: [AssessmentController],
})
export class AssessmentModule {}
