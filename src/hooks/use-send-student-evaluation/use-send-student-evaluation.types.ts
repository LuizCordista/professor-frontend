export interface UseSendStudentEvaluationProps {
    name: string;
    id: string;
    status: string;
}

export interface APIError {
    response?: {
      status: number;
      data: {
        message: string;
      };
    };
    message: string;
  }

  