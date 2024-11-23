import axios, { AxiosResponse } from 'axios'
import { GenerateQuizResponse, QuizDifficulty, QuizQuestion, QuizSubject } from '@/api/api.model';

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_URL_GENERATE_QUIZ,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 14000, // Set a timeout for requests
});

export async function generateQuiz(questionsNumber: number, subject: QuizSubject, difficulty: QuizDifficulty): Promise<QuizQuestion[]> {
    const apiResponse: AxiosResponse<GenerateQuizResponse> = await apiClient.get('/generateQuiz', {
        params: {
            questions: questionsNumber, subject, difficulty
        }
    });
    return apiResponse.data.questionnaire;
}
