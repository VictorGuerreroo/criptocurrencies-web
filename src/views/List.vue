<template>
    <div>
        <v-card>
            <v-card-title>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                ></v-text-field>
            </v-card-title>
                <v-data-table
                    :headers="headers"
                    :items="coins"
                    :items-per-page="15"
                    class="elevation-1"
                    :search="search"
                    :loading= "loading"
                    loading-text="Loading... Please wait"
                >
                <template v-slot:item.image="{ item }">
                    <div>
                        <v-img :src="item.image" :alt="item.name" height="30px" width="30px"></v-img>
                    </div>
                </template>
                </v-data-table>
        </v-card>
    </div> 
</template>

<script lang="ts">

export default {
    data () {
        return {
            coins: [] as [],
            headers: [
                { text: 'Position', value: 'market_cap_rank', align: 'start' ,filterable: true },
                { text: 'Coin', sortable: false, value: 'name', align: 'start' },
                { text: 'Symbol', value: 'symbol', align: 'start' },
                { text: 'Image', value: 'image', align: 'start' },
                { text: 'Price', value: 'current_price', align: 'start' },
            ],
            search: '' as string,
            loading: true as boolean
        }
    },
    computed: {

        },

    methods: {
        async getCoins() {
            let url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=1&sparkline=false`;
            await this.axios.get(url).then((response) => {
                console.log('response >>>', response);
                this.coins = response.data;
                console.log('coins >>>', this.coins);
            })
        },
    },
    created() {
            this.loading;
            this.getCoins();
            this.loading = false;
        },
}
</script>
<style lang="">
    
</style>