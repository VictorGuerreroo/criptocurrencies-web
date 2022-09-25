<template>
    <div>
        <v-row
            align="center"
            justify="center"
            class="mb-3"
        >
            <v-col
                class="ml-12 mr-8"
                align="center" 
                >
                <v-img 
                    class="mr-3"
                    align="center" 
                    :src="asset.image.large"  
                    max-height="50px" 
                    max-width="50px">
                </v-img>
                {{ asset.name }}{{ asset.symbol.toUpperCase() }}
            </v-col>
            <v-col
                class="ml-8 mr-8 mt-4"
            >
                <strong class="mt-9">Ranking:</strong> {{asset.coingecko_rank}}
                <br>
                <strong class="mb-5">Precio actual:</strong> {{`$ ${asset.market_data.current_price.usd}`}}
                <br>
                <strong>Cap.mercado:</strong> {{`$ ${asset.market_data.market_cap.usd}`}}
                <br>
                <strong>Oferta en circulación:</strong> {{`$ ${asset.market_data.circulating_supply}`}}
                <br>
                <strong>Oferta máxima:</strong> {{`$ ${asset.market_data.max_supply}`}}
                <br>
                <strong>Variación 24hrs:</strong> {{`$ ${asset.market_data.price_change_percentage_24h}`}}
            </v-col>
            <v-col
                class="ml-8 mr-12"
            >
                <v-btn class="mt-6"><a  :href="asset.links.homepage[0]" class="white--black" target="_blank">{{asset.links.homepage[0]}}</a></v-btn>
                <br>
                <v-btn class="mt-2 mb-2"><a :href="asset.links.subreddit_url" class="white--black" target="_blank">{{asset.links.subreddit_url}}</a></v-btn>
                <br>
                <v-btn class="mb-2"><a :href="asset.links.official_forum_url[0]" class="white--black" target="_blank">{{asset.links.official_forum_url[0]}}</a></v-btn>
                <br>
                <v-btn class="mb-2"><a :href="asset.links.repos_url.github[0]" class="white--black" target="_blank">{{asset.links.repos_url.github[0]}}</a></v-btn>
                <br>
            </v-col>
        </v-row>
    </div>
</template>
<script lang="ts">

import Vue from "vue";

export default Vue.extend({
    name: "CoinDetail",

    //components: 

    data() {
        return {
        loading: false,
        asset: {} as any,
        /*history: [],
        markets: [],
        fromUsd: true,
        convertValue: null, */
        };
    },

    computed: {
        host_name(): any {
            return this.$route.params;
        },
    },

    watch: {
    $route() {
        this.getCoin()
    }
},

    methods: {
        async getCoin() {
            let url = `https://api.coingecko.com/api/v3/`;
            const id = this.$route.params.id
            this.loading = true;
            await this.axios.get(`${url}/coins/${id}`)
                .then((response) => {
                    console.log('response >>>', response);
                    this.asset = response.data;
                    console.log('asset >>>', this.asset);
                })
                .catch((error) => {
                    console.log(error);
                });
            console.log(this.asset)
        },
    },
        created(){
            this.getCoin();
        }
    
});
</script>
<style>

a { text-decoration: none; 
    color: black !important;} 
</style>
