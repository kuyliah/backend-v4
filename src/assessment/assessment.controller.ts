import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { StudentGuard } from '../guards/student.guard';
import { Assessment } from '../types/assessment';
import { User as UserDocument } from '../types/user';
import { User } from '../utilities/user.decorator';
import { CreateAssessmentDTO, UpdateAssessmentDTO } from './assessment.dto';
import { AssessmentService } from './assessment.service';

@Controller('assessment')
export class AssessmentController {
  constructor(private assessmentService: AssessmentService) {}

  // @Get()
  // async listAll(): Promise<Assessment[]> {
  //   return await this.assessmentService.findAll();
  // }

  // @Get('/mine')
  // @UseGuards(AuthGuard('jwt'), SellerGuard)
  // async listMine(@User() user: UserDocument): Promise<Product[]> {
  //   const { id } = user;
  //   return await this.productService.findByOwner(id);
  // }

  // @Get('/seller/:id')
  // async listBySeller(@Param('id') id: string): Promise<Product[]> {
  //   return await this.productService.findByOwner(id);
  // }

  @Post()
  @UseGuards(AuthGuard('jwt'), StudentGuard)
  async create(
    @Body() assessment: CreateAssessmentDTO,
    @User() user: UserDocument,
  ): Promise<Assessment> {
    return await this.assessmentService.create(assessment, user);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), StudentGuard)
  async read(@User() user: UserDocument): Promise<Assessment> {
    return await this.assessmentService.findByOwner(user);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), StudentGuard)
  async update(
    @Param('id') id: string,
    @Body() assessment: UpdateAssessmentDTO,
    @User() user: UserDocument,
  ): Promise<Assessment> {
    const { id: userId } = user;
    return await this.assessmentService.update(id, assessment, userId);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), StudentGuard)
  async delete(
    @Param('id') id: string,
    @User() user: UserDocument,
  ): Promise<Assessment> {
    const { id: userId } = user;
    return await this.assessmentService.delete(id, userId);
  }

  // @Get(':id')
  // findOne(@Param('id') id): Promise<Assessment> {
  //   return this.assessmentService.findById(id);
  // }

  @Get('assessments')
  findAll(): Promise<Assessment[]> {
    return this.assessmentService.findAll();
  }
}
