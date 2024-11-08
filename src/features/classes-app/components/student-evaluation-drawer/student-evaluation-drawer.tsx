import React from 'react';
import { Drawer, Box, Typography, IconButton, Button, Input } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { getStudentsStatusColor } from '../../../../utils/status-color';
import { handleNumberInput } from '../../../../utils/handle-number-input';

interface StudentEvaluationDrawerProps {
  open: boolean;
  onClose: () => void;
  student: any;
  aulasLecionadas: string;
  setAulasLecionadas: (value: string) => void;
  aulasAssistidas: string;
  setAulasAssistidas: (value: string) => void;
  notaP1: string;
  setNotaP1: (value: string) => void;
  notaP2: string;
  setNotaP2: (value: string) => void;
  onSubmit: () => Promise<void>;
  error: string | null;
}

export const StudentEvaluationDrawer: React.FC<StudentEvaluationDrawerProps> = ({
  open,
  onClose,
  student,
  aulasLecionadas,
  setAulasLecionadas,
  aulasAssistidas,
  setAulasAssistidas,
  notaP1,
  setNotaP1,
  notaP2,
  setNotaP2,
  onSubmit,
  error
}) => {
  if (!student) return null;

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
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Typography color="textSecondary">
            Status:
          </Typography>
          <Typography 
            sx={{ 
              color: getStudentsStatusColor(student.status),
              fontWeight: 'medium'
            }}
            >
            {student.status}
          </Typography>
        </Box>
        <Typography variant="caption" sx={{ mb: 1 }}>Aulas Lecionadas</Typography>
        <Input
          type="text"
          value={aulasLecionadas}
          onChange={(e) => handleNumberInput(e.target.value, setAulasLecionadas, false)}
          fullWidth
          sx={{ mb: 2 }}
        />

        <Typography variant="caption" sx={{ mb: 1 }}>Aulas Assistidas pelo Aluno</Typography>
        <Input
          type="text"
          value={aulasAssistidas}
          onChange={(e) => handleNumberInput(e.target.value, setAulasAssistidas, false)}
          fullWidth
          sx={{ mb: 2 }}
        />

        <Typography variant="caption" sx={{ mb: 1 }}>Nota da P1</Typography>
        <Input
          type="text"
          value={notaP1}
          onChange={(e) => handleNumberInput(e.target.value, setNotaP1, true)}
          fullWidth
          sx={{ mb: 2 }}
        />

        <Typography variant="caption" sx={{ mb: 1 }}>Nota da P2</Typography>
        <Input
          type="text"
          value={notaP2}
          onChange={(e) => handleNumberInput(e.target.value, setNotaP2, true)}
          fullWidth
          sx={{ mb: 2 }}
        />
        
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        
        <Button variant="contained" color="primary" onClick={onSubmit} fullWidth>
          Lançar Notas e Frequência
        </Button>
      </Box>
    </Drawer>
  );
};
