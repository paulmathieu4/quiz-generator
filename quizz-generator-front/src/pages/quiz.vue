<script setup lang="ts">

import { QuizQuestion, QuizQuestionEnhanced } from '@/api/api.model';
import { generateQuiz } from '@/api/api';

const quizForm = ref(null);
const userAnswers: Ref<string[]> = ref(null);
const questions: Ref<QuizQuestionEnhanced[]> = ref(null);

onMounted(() => {
    generateQuestions();
})

async function generateQuestions() {
    const rawQuestions: QuizQuestion[] = await generateQuiz();
    questions.value = rawQuestions.map(question => enhanceQuestion(question));
    userAnswers.value = questions.value.map(question => question.allAnswers[0]);
    console.log('generated enhanced questions: ', questions.value);
}

async function logFormValue() {
    console.log('userAnswers: ', userAnswers.value);
}

function enhanceQuestion(question: QuizQuestion): QuizQuestionEnhanced {
    const correctAnswerRandomIndex = Math.floor(Math.random() * 4);
    const allAnswers: string[] = [];
    let wrongAnswerIndex = 0;
    for (let i = 0; i < 4; i++) {
        if (i === correctAnswerRandomIndex) {
            allAnswers.push(question.correctAnswer)
        } else {
            allAnswers.push(question.wrongAnswers[wrongAnswerIndex]);
            wrongAnswerIndex++;
        }
    }
    return {
        ...question,
        allAnswers
    };
}
</script>

<template>
    <v-btn color="primary" size="x-large" stacked @click="logFormValue">
        Log form value
    </v-btn>
    <v-sheet
        class="pa-4 mx-auto"
        :elevation="2"
        :max-width="800"
        border
        rounded
    >
        <v-form v-if="questions" id="quiz-form" ref="quizForm" class="mt-2">
            <template v-for="(question, questionIndex) of questions">
                <div class="text-h5 mb-1">
                    {{ question.question }}
                </div>
                <v-radio-group v-model="userAnswers[questionIndex]">
                    <v-radio v-for="choice of question.allAnswers" color="primary" :label="choice"
                             :value="choice"></v-radio>
                </v-radio-group>
                <v-divider v-if="questionIndex !== questions.length - 1"
                           class="border-opacity-25 mb-6"></v-divider>
            </template>

        </v-form>
    </v-sheet>
    <v-btn class="d-block mx-auto mt-6" prepend-icon="mdi-check-all" color="primary" size="x-large" stacked>
        Valider
    </v-btn>
</template>

<style lang="scss">
#quiz-form {
    label {
        opacity: 1;
    }
}
</style>