<template>
    <v-app>
        <MenuBarComponent/>
        <v-main>
            <router-view/>
        </v-main>
        <FooterComponent/>
    </v-app>
</template>

<script lang="ts">

import Vue from 'vue';

import MenuBarComponent from './components/MenuBarComponent.vue'
import FooterComponent from './components/Footer.vue'

export default Vue.extend({
    name: 'App',

    components: {
        MenuBarComponent,
        FooterComponent
    },

    data: () => ({
        
    }),
});
</script>
