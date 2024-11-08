export enum StudentStatus {
  NAO_AVALIADO = 'NAO_AVALIADO',
  EM_EXAME = 'EM_EXAME',
  REPROVADO = 'REPROVADO',
  APROVADO = 'APROVADO',
}

export enum ClassStatus {
  ABERTA = 'ABERTA',
  FECHADA = 'FECHADA',
  EM_FECHAMENTO = 'EM_FECHAMENTO'
  
}

const STUDENT_STATUS_COLORS = {
  [StudentStatus.NAO_AVALIADO]: 'textPrimary',
  [StudentStatus.EM_EXAME]: '#fbc02d',
  [StudentStatus.REPROVADO]: '#d32f2f',
  [StudentStatus.APROVADO]: '#388e3c'
} as const;

const CLASS_STATUS_COLORS = {
  [ClassStatus.ABERTA]: '#388e3c',
  [ClassStatus.FECHADA]: '#d32f2f',
  [ClassStatus.EM_FECHAMENTO]: '#fbc02d'
} as const;


export const getStudentsStatusColor = (status: string): string => {
  const normalizedStatus = status.toUpperCase() as StudentStatus;
  return STUDENT_STATUS_COLORS[normalizedStatus] || 'textPrimary';
};

export const getClassesStatusColor = (status: string): string => {
  const normalizedStatus = status.toUpperCase() as ClassStatus;
  return CLASS_STATUS_COLORS[normalizedStatus] || 'textPrimary';
};