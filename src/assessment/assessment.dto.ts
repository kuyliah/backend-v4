import { ResultRiasec } from '../types/assessment';

export interface CreateAssessmentDTO {
  title: string;
  status: boolean,
  result: string,
  riasec_score: string,
  result_riasec: ResultRiasec;
}

export type UpdateAssessmentDTO = Partial<CreateAssessmentDTO>;
