<template>
    <v-app>
        <v-app-bar :elevation="1">
            <template v-slot:prepend>
                <RouterLink to="/">
                    <v-img
                        :width="60"
                        src="@/assets/brain.svg"
                    ></v-img>
                </RouterLink>

            </template>
            <v-app-bar-title>ChatGPT Quiz Generator</v-app-bar-title>
        </v-app-bar>
        <v-main>
            <router-view/>
        </v-main>
    </v-app>
</template>

<script lang="ts" setup>
//
</script>
