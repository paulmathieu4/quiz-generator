export interface GenerateQuizResponse {
    questionnaire: QuizQuestion[];
}

export interface QuizQuestion {
    "question": string;
    "correctAnswer": string;
    "wrongAnswers": string[];
}

export interface QuizQuestionEnhanced extends QuizQuestion {
    "allAnswers": string[];
}

export enum QuizSubject {
    Geo = 'geography',
    History = 'history',
    Animals = 'animals',
    CarAndMecanics = 'car and mechanics',
    FunFacts = 'fun facts',
    Technology = 'technology',
    Sport = 'sport',
    Health = 'health',
}

export enum QuizDifficulty {
    Easy = 'easy',
    Medium = 'medium',
    Hard = 'hard',
}
