import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);


export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#409eff',
                secondary: '#b0bec5',
                accent: '#8c9eff',
                red: '#d24d57',
                success: '#26a65b'
            },
        },
    },
});
