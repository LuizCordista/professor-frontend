export interface ApiResponseBody {
  code: string;
  courseId: string;
  professorId: string;
  campus: string;
  period: string;
  modality: string;
  status: string;
}

export interface listProfessorClassesByIdServiceInput {
  urlBase: string;
  professorId: string;
}

export type listProfessorClassesByIdServiceResult = ApiResponseBody[];

export type ListProfessorClassesByIdService = (
  params: listProfessorClassesByIdServiceInput,
) => Promise<listProfessorClassesByIdServiceResult>;
