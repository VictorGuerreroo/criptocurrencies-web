<template>
    <v-app-bar
            app
            color="primary"
            dark
        >
        <v-spacer></v-spacer>
        
            <router-link
                v-for="(item, i) in arrayAppBar"
                :key="i"
                :to="item.to"
            >
                <span class="mr-2 white--text">{{ item.text}}</span>
                <v-icon class="mb-2 mr-9">{{item.icon}}</v-icon>
            </router-link> 
        </v-app-bar>
</template>

<script lang="ts">

import Vue from 'vue'

export default Vue.extend ({
    name: 'MenuBarComponent',

    data: () => ({
        arrayAppBar:[
            {
                text: 'Home',
                to: '/',
                icon: 'mdi-home-outline'
            },
            {
                text: 'List',
                to: 'List',
                icon: 'mdi-format-list-numbered'
            },
            {
                text: 'Contact',
                to: 'Contact',
                icon: 'mdi-card-account-phone-outline'
            },
        ],
    }),
})
</script>

<style scoped lang="css">
    
</style>