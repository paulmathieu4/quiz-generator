<script setup lang="ts">

import { QuizDifficulty, QuizSubject } from '@/api/api.model';

const router = useRouter();

const numberOfQuestions = ref(10);
const difficulty: Ref<QuizDifficulty> = ref(QuizDifficulty.Medium);
const subject: Ref<QuizSubject> = ref(QuizSubject.Geo);

function goToQuiz() {
    router.push({
        path: '/quiz', query: {
            numberOfQuestions: numberOfQuestions.value,
            subject: subject.value,
            difficulty: difficulty.value,

        }
    });
}

</script>

<template>
    <v-sheet
        class="my-6 pa-4 mx-auto"
        elevation="4"
        :max-width="800"
        border
        rounded
    >
        <div class="fill-height d-flex justify-center">
            <v-form>
                <h1 class="text-center mb-2">
                    Choose Your Quiz
                </h1>
                <v-select
                    label="Subject"
                    v-model="subject"
                    :items="[
                        QuizSubject.Geo,
                        QuizSubject.History,
                        QuizSubject.FunFacts,
                        QuizSubject.Animals,
                        QuizSubject.CarAndMecanics,
                        QuizSubject.Technology,
                        QuizSubject.Sport,
                        QuizSubject.Health]"
                ></v-select>
                <v-select
                    label="Difficulty"
                    v-model="difficulty"
                    :items="[QuizDifficulty.Easy, QuizDifficulty.Medium, QuizDifficulty.Hard]"
                ></v-select>
                <v-select
                    label="Number of questions"
                    v-model.number="numberOfQuestions"
                    :items="[5, 10, 20]"
                >
                </v-select>
                <div class="d-flex flex-column align-center">
                    <v-btn prepend-icon="mdi-brain" color="primary" size="x-large" stacked
                           @click.prevent="goToQuiz">
                        <template v-slot:prepend>
                            <v-icon color="pink-accent-1"></v-icon>
                        </template>
                        Generate Quiz
                    </v-btn>
                    <div class="mt-2 text-caption">Powered by ChatGPT.</div>
                </div>
            </v-form>
        </div>
    </v-sheet>
</template>

<style scoped lang="scss">

</style>