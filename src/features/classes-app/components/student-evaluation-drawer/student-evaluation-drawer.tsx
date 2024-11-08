import React from 'react';
import { Drawer, Box, Typography, IconButton, Button, Input } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useSendStudentEvaluation } from '../../../../hooks/use-send-student-evaluation/use-send-student-evaluation.hook.ts';

interface StudentEvaluationDrawerProps {
  open: boolean;
  onClose: () => void;
  student: any;
  onSubmitted: () => Promise<void>;
}

export const StudentEvaluationDrawer: React.FC<StudentEvaluationDrawerProps> = ({ open, onClose, student, onSubmitted }) => {

  const {
    aulasLecionadas,
    setAulasLecionadas,
    aulasAssistidas,
    setAulasAssistidas,
    notaP1,
    setNotaP1,
    notaP2,
    setNotaP2,
    handleNumberInput,
    handleSubmit,
    error
  } = useSendStudentEvaluation();

  if (!student) return null;

  const handleEvaluationSubmit = async () => {
    const success = await handleSubmit(student);
    if (success) {
      await onSubmitted();
    }
  };


  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 300, padding: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Notas e Frequência</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography variant="h5" component="h2">
          {student.name}
        </Typography>
        <Typography color="textSecondary">
          RA: {student.id}
        </Typography>
        <Typography color="textSecondary">
          Status: {student.status}
        </Typography>
        <Typography variant="caption" sx={{ mb: 1 }}>Aulas Lecionadas</Typography>
        <Input
          type="text"
          value={aulasLecionadas}
          onChange={(e) => handleNumberInput(e.target.value, setAulasLecionadas, false)}
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          fullWidth
          sx={{ mb: 2 }}
        />

        <Typography variant="caption" sx={{ mb: 1 }}>Aulas Assistidas pelo Aluno</Typography>
        <Input
          type="text"
          value={aulasAssistidas}
          onChange={(e) => handleNumberInput(e.target.value, setAulasAssistidas, false)}
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          fullWidth
          sx={{ mb: 2 }}
        />

        <Typography variant="caption" sx={{ mb: 1 }}>Nota da P1</Typography>
        <Input
          type="number"
          value={notaP1}
          onChange={(e) => handleNumberInput(e.target.value, setNotaP1, true)}
          inputProps={{ 
            inputMode: 'decimal',
            step: 'any',
          }}
          fullWidth
          sx={{ mb: 2 }}
        />

        <Typography variant="caption" sx={{ mb: 1 }}>Nota da P2</Typography>
        <Input
          type="number"
          value={notaP2}
          onChange={(e) => handleNumberInput(e.target.value, setNotaP2, true)}
          inputProps={{ 
            inputMode: 'decimal',
            step: 'any',
          }}
          fullWidth
          sx={{ mb: 2 }}
        />
        
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        
        <Button variant="contained" color="primary" onClick={handleEvaluationSubmit} fullWidth>
          Lançar Notas e Frequência
        </Button>
      </Box>
    </Drawer>
  );
};
