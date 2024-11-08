export interface ApiResponseBody {
    name: string,
    id: string,
    status: string,
  }

export interface SendStudentEvaluationServiceInput {
    urlBase: string;
    studentId: string;
    aulasLecionadas: number;
    aulasAssistidas: number;
    notaP1: number;
    notaP2: number;
  }
  
  export type SendStudentEvaluationServiceResult = ApiResponseBody;
  
  export type SendStudentEvaluationService = (
    params: SendStudentEvaluationServiceInput
  ) => Promise<SendStudentEvaluationServiceResult>;