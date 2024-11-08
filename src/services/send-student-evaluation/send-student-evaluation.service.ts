import axios from 'axios';
import { SendStudentEvaluationService } from './send-student-evaluation.types';

export const sendStudentEvaluationService: SendStudentEvaluationService = async ({
  urlBase,
  studentId,
  aulasLecionadas,
  aulasAssistidas,
  notaP1,
  notaP2,
}) => {
  const response = await axios.post(`${urlBase}/students/${studentId}/evaluation`, {
    aulasLecionadas,
    aulasAssistidas,
    notaP1: notaP1,
    notaP2: notaP2,
  });
  
  return response.data;
};