<script setup lang="ts">

import { QuizQuestion } from '@/api/api.model';
import { generateQuiz } from '@/api/api';

const quizForm = ref(null);
const userAnswers = ref(['Paris', 'Africa', 'Amazon']);

onMounted(() => {
    generateQuestions();
})

async function generateQuestions() {
    const questions: QuizQuestion[] = await generateQuiz();
    console.log('generated questions: ', questions);
}

async function logFormValue() {
    console.log('userAnswers: ', userAnswers.value);
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
        <v-form id="quiz-form" ref="quizForm" class="mt-2">
            <div class="text-h5 mb-1">
                What is the capital city of France?
            </div>
            <v-radio-group v-model="userAnswers[0]">
                <v-radio color="primary" label="Paris" value="Paris"></v-radio>
                <v-radio color="primary" label="Berlin" value="Berlin"></v-radio>
                <v-radio color="primary" label="Madrid" value="Madrid"></v-radio>
                <v-radio color="primary" label="Rome" value="Rome"></v-radio>
            </v-radio-group>
            <v-divider class="border-opacity-25 mb-6"></v-divider>
            <div class="text-h5 mb-1">
                Which continent is the Sahara Desert located on?
            </div>
            <v-radio-group v-model="userAnswers[1]">
                <v-radio color="primary" label="Africa" value="Africa"></v-radio>
                <v-radio color="primary" label="Asia" value="Asia"></v-radio>
                <v-radio color="primary" label="Australia" value="Australia"></v-radio>
                <v-radio color="primary" label="North America" value="North America"></v-radio>
            </v-radio-group>
            <v-divider class="border-opacity-25 mb-6"></v-divider>
            <div class="text-h5 mb-1">
                What river is the longest in the world?
            </div>
            <v-radio-group v-model="userAnswers[2]">
                <v-radio color="primary" label="Amazon" value="Amazon"></v-radio>
                <v-radio color="primary" label="Yangtze" value="Yangtze"></v-radio>
                <v-radio color="primary" label="Nile" value="Nile"></v-radio>
                <v-radio color="primary" label="Mississippi" value="Mississippi"></v-radio>
            </v-radio-group>
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