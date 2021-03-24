import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Assessment } from '../types/assessment';
import { User } from '../types/user';
import { CreateAssessmentDTO, UpdateAssessmentDTO } from './assessment.dto';

@Injectable()
export class AssessmentService {
  constructor(
    @InjectModel('Assessment') private assessmentModel: Model<Assessment>,
  ) {}

  async findAll(): Promise<Assessment[]> {
    return await this.assessmentModel.find().populate('owner');
  }

  async findByOwner(user: User): Promise<Assessment> {
    return await this.assessmentModel
      .findOne({ owner: user })
      .populate({ path: 'owner' });
  }

  async findById(id: string): Promise<Assessment> {
    const assessment = await this.assessmentModel
      .findById(id)
      .populate('owner');
    if (!assessment) {
      throw new HttpException('Assessment not found', HttpStatus.NO_CONTENT);
    }
    return assessment;
  }

  async create(
    assessmentDTO: CreateAssessmentDTO,
    user: User,
  ): Promise<Assessment> {
    const assessment = await this.assessmentModel.create({
      ...assessmentDTO,
      owner: user,
    });
    await assessment.save();
    return assessment.populate('owner');
  }

  async update(
    id: string,
    assessmentDTO: UpdateAssessmentDTO,
    userId: string,
  ): Promise<Assessment> {
    const assessment = await this.assessmentModel.findById(id);
    if (userId !== assessment.owner.toString()) {
      throw new HttpException(
        'You do not own this assessment',
        HttpStatus.UNAUTHORIZED,
      );
    }
    await assessment.update(assessmentDTO);
    return await this.assessmentModel.findById(id).populate('owner');
  }

  async delete(id: string, userId: string): Promise<Assessment> {
    const assessment = await this.assessmentModel.findById(id);
    if (userId !== assessment.owner.toString()) {
      throw new HttpException(
        'You do not own this assessment',
        HttpStatus.UNAUTHORIZED,
      );
    }
    await assessment.remove();
    return assessment.populate('owner');
  }
}
