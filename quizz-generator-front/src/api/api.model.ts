export interface GenerateQuizResponse {
    questionnaire: QuizQuestion[];
}

export interface QuizQuestion {
    "question": string;
    "correctAnswer": string;
    "wrongAnswers": string[];
}

