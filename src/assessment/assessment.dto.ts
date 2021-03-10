import { ResultRiasec } from '../types/assessment';

export interface CreateAssessmentDTO {
  title: string;
  status: boolean,
  result: string,
  result_riasec: ResultRiasec;
}

export type UpdateAssessmentDTO = Partial<CreateAssessmentDTO>;
