export const getStudentsStatusColor = (status: string): string => {
  switch (status.toUpperCase()) {
    case 'NAO_AVALIADO':
      return 'textPrimary';
    case 'EM_EXAME':
      return '#fbc02d';
    case 'REPROVADO':
      return '#d32f2f';
    case 'APROVADO':
      return '#388e3c';
    default:
      return 'textPrimary';
  }
};

export const getClassesStatusColor = (status: string): string => {
  switch (status.toUpperCase()) {
    case 'ABERTA':
      return '#388e3c';
    case 'FECHADA':
      return '#d32f2f';
    case 'EM_FECHAMENTO':
      return '#fbc02d';
    default:
      return 'textPrimary';
  }
}

