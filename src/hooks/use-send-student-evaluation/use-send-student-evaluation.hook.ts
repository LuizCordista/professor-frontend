import { useState } from 'react';
import { APIError, UseSendStudentEvaluationProps } from './use-send-student-evaluation.types.ts';
import { sendStudentEvaluationService } from '../../services/send-student-evaluation/send-student-evaluation.service.ts';

export const useSendStudentEvaluation = () => {
    const [selectedStudent, setSelectedStudent] = useState<UseSendStudentEvaluationProps | null>(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [aulasLecionadas, setAulasLecionadas] = useState('');
    const [aulasAssistidas, setAulasAssistidas] = useState('');
    const [notaP1, setNotaP1] = useState('');
    const [notaP2, setNotaP2] = useState('');


    const handleOpenDrawer = (student: UseSendStudentEvaluationProps) => {
        setSelectedStudent(student);
        setDrawerOpen(true);
    };

    const handleCloseDrawer = () => {
        setDrawerOpen(false);
        setSelectedStudent(null);
    };

    const handleNumberInput = (
        value: string,
        setter: (value: string) => void,
        allowDecimals: boolean = false
    ) => {
        if (!allowDecimals) {
            const numberValue = value.replace(/\D/g, '');
            setter(numberValue);
            return;
        }

        const numberValue = value.replace(/[^\d.]/g, '');
        if (numberValue === '' || /^\d*\.?\d*$/.test(numberValue)) {
            setter(numberValue);
        }
    };

    const handleSubmit = async (student: UseSendStudentEvaluationProps) => {
        setError(null);
        
        if (!student) {
            setError('Estudante não selecionado');
            return;
        }

        const numAulasAssistidas = Number(aulasAssistidas);
        const numAulasLecionadas = Number(aulasLecionadas);
        const numNotaP1 = Number(notaP1);
        const numNotaP2 = Number(notaP2);

        if (numAulasAssistidas == 0 || numAulasLecionadas == 0 || numNotaP1 == 0 || numNotaP2 == 0) {
            setError('Todos os campos são obrigatórios.');
            return false;
        }

        if (numAulasAssistidas > numAulasLecionadas) {
            setError('Aulas Assistidas não pode ser maior que aulas lecionadas.');
            return false;
        }

        if (numNotaP1 < 0 || numNotaP1 > 10 || numNotaP2 < 0 || numNotaP2 > 10) {
            setError('Nota deve ser entre 0 e 10.');
            return false;
        }

        try {
            await sendStudentEvaluationService({
                urlBase: 'http://localhost:8080',
                studentId: student.id,
                aulasLecionadas: numAulasLecionadas,
                aulasAssistidas: numAulasAssistidas,
                notaP1: numNotaP1,
                notaP2: numNotaP2
            });

            return true;

        } catch (err) {
            const error = err as APIError;
            setError(
                error.response?.status === 400 
                    ? error.response.data.message 
                    : error.message
            );
            return false;
        }
    };

    return {
        selectedStudent,
        drawerOpen,
        aulasLecionadas,
        setAulasLecionadas,
        aulasAssistidas,
        setAulasAssistidas,
        notaP1,
        setNotaP1,
        notaP2,
        setNotaP2,
        handleOpenDrawer,
        handleCloseDrawer,
        handleNumberInput,
        handleSubmit,
        error
    };
};
