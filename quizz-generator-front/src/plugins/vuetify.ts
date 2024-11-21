/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

export const myCustomDarkTheme = {
    dark: true,
    colors: {
        primary: '#7A3AC5',
        secondary: '#655A70',
        accent: '#E5CDFC',
        error: '#BA1B1B',
        warning: '#ff9800',
        info: '#02baa9',
        success: '#74c578'
    }
}

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
    theme: {
        defaultTheme: 'myCustomDarkTheme',
        themes: {
            myCustomDarkTheme,
        },
    },

})
