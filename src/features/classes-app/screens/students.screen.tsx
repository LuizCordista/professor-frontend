import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Card, CardContent, CircularProgress, IconButton, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useListStudentsFromClassById } from '../../../hooks/use-list-students-from-class-by-id/use-list-students-from-class-by-id.hook';
import { StudentEvaluationDrawer } from '../components/student-evaluation-drawer/student-evaluation-drawer.tsx';
import { useSendStudentEvaluation } from '../../../hooks/use-send-student-evaluation/use-send-student-evaluation.hook.ts';

export const StudentsScreen: React.FC = () => {
  const { classId } = useParams<{ classId: string }>();
  const navigate = useNavigate();
  const { result: studentsInfo, loading, error, refetch } = useListStudentsFromClassById({ classId: classId! });
  
  const {
    selectedStudent,
    drawerOpen,
    handleOpenDrawer,
    handleCloseDrawer,
  } = useSendStudentEvaluation();

  const handleEvaluationSubmitted = async () => {
    await refetch();
    handleCloseDrawer();
  };

  const handleBackClick = () => {
    navigate('/'); 
  };

  return (
    <Box sx={{ padding: '40px' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <IconButton onClick={handleBackClick} sx={{ marginRight: '2px' }}>
          <ArrowBackIcon/> 
          <Typography variant="h6"> Voltar </Typography> 
        </IconButton>
        <Typography variant="h5" sx={{ marginBottom: '20px', marginTop: '20px' }}>
          Alunos da Turma: {classId}
        </Typography>
      </Box>

      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}
      
      {studentsInfo && studentsInfo.length > 0 ? (
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="flex-start"
          gap={2}
        >
          {studentsInfo.map((student) => (
            <Box
              key={student.id}
              sx={{
                width: { xs: '100%', sm: '45%', md: '30%' },
                padding: '1rem'
              }}
            >
              <Card sx={{ height: '100%', boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {student.name}
                  </Typography>
                  <Typography color="textSecondary">
                    RA: {student.id}
                  </Typography>
                  <Typography color="textSecondary">
                    Status: {student.status}
                  </Typography>
                  <Button onClick={() => handleOpenDrawer(student)}>
                    Ver Notas e Frequência
                  </Button>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      ) : (
        !loading && <Typography>Nenhum aluno encontrado.</Typography>
      )}
      <StudentEvaluationDrawer
        open={drawerOpen}
        onClose={handleCloseDrawer}
        student={selectedStudent}
        onSubmitted={handleEvaluationSubmitted}
      />
    </Box>
  );
};