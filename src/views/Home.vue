<template>
    <div class="backgroundImage">
    </div>
</template>

<script lang="ts">

import Vue from 'vue'
import HelloWorld from '../components/HelloWorld.vue'

export default Vue.extend({
    name: 'Home',

    components: {
        HelloWorld,
        },
    })
</script>

<style scoped>
    .backgroundImage{
        display: flex;
        background-image: url(../assets/backgroundImage.jpg);
        height: 100%;
        width:100%;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-attachment: fixed;
    }
</style>
