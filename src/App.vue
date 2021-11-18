<template>
    <v-app>
        <MenuBarComponent/>
        <v-main>
            <router-view/>
        </v-main>
    </v-app>
</template>

<script lang="ts">

import Vue from 'vue';
import MenuBarComponent from './components/MenuBarComponent.vue'

export default Vue.extend({
    name: 'App',

    components: {
        MenuBarComponent
    },

    data: () => ({
        
    }),
});
</script>
