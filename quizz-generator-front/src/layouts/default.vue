<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();


async function navigateToNewQuiz() {
    router.push('/quiz/create')
}
</script>

<template>
    <v-app>
        <v-app-bar :elevation="1" color="primary">
            <template v-slot:prepend>
                <RouterLink to="/">
                    <v-img
                        :width="60"
                        src="@/assets/brain.svg"
                    ></v-img>
                </RouterLink>

            </template>
            <v-app-bar-title>Quiz Master by Paul MATHIEU</v-app-bar-title>
            <template v-slot:append>
                <v-btn icon="mdi-file-plus" @click="navigateToNewQuiz"></v-btn>
            </template>
        </v-app-bar>
        <v-main>
            <router-view/>
        </v-main>
    </v-app>
</template>

