import axios, { AxiosResponse } from 'axios'
import { GenerateQuizResponse, QuizDifficulty, QuizQuestion, QuizSubject } from '@/api/api.model';

export const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:5001/quiz-generator-9f264/us-central1', // Replace with your API URL
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
