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
                    id="table"
                    :headers="headers"
                    :items="coins"
                    :items-per-page="25"
                    class="elevation-1"
                    :search="search"
                    :loading= "loading"
                    loading-text="Loading... Please wait"
                    height="800"
                    fixed-header
                >
                    <template v-slot:item.name="{ item }">
                        <div class="d-flex"><v-img class="mr-3" :src="item.image" :alt="item.name" max-height="30px" max-width="30px"></v-img><div class="mt-1 mr-2">{{item.name}}</div><span class="grey--text mt-1">{{item.symbol.toUpperCase()}}</span></div>
                    </template>

                    <template v-slot:item.current_price="{ item }">
                        <span>{{item.current_price | dollar}}</span>
                    </template>
                    
                    <template v-slot:item.price_change_percentage_24h="{ item }">
                        <span>{{ item.price_change_percentage_24h | percent}}</span>
                    </template>

                    <template v-slot:item.market_cap="{ item }">
                        <span>{{item.market_cap | market}}</span>
                    </template>

                    <template v-slot:item.circulating_supply="{ item }">
                        <span>{{item.circulating_supply | supply}} {{item.symbol.toUpperCase()}}</span>
                    </template>

                </v-data-table>
        </v-card>
    </div> 
</template>

<script lang="ts">

import Vue from "vue";

export default Vue.extend({
    data () {
        return {
            coins: [] as [],
            headers: [
                { text: 'Position', value: 'market_cap_rank', align: 'start' ,filterable: true, class:'black--text' },
                { text: 'Coin', sortable: false, value: 'name', align: 'start', class:'black--text text-no-wrap',cellClass:'text-no-wrap px-1' },
                { text: 'Price', value: 'current_price', align: 'start', class:'black--text' },
                { text: '24h %', sortable: true, value: 'price_change_percentage_24h', align: 'start', class:'black--text' },
                { text: 'Market Cap', sortable: true, value: 'market_cap', align: 'start', class:'black--text'},
                { text: 'Circulating Supply', sortable: true, value: 'circulating_supply', align: 'start', class:'black--text'}
                
            ],
            search: '' as string,
            loading: false as boolean
        }
    },
    computed: {

        },

    methods: {
        async getCoins() {
            let url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=1&sparkline=false`;
            this.loading = true;
            await this.axios.get(url).then((response) => {
                console.log('response >>>', response);
                this.coins = response.data;
                console.log('coins >>>', this.coins);
            })
            this.loading = false;
        },
    },
    async created() {
            await this.getCoins();
        }
});
</script>
<style scoped lang="scss">
    /* .myTable thead{
        background-color:darkslategray 
    } */
    /*   #table > .v-data-footer .v-icon {
    color: black!important;
} */
#table .v-data-footer {
    position: fixed;
    bottom: 150;
    width: 100%;
    background: white;
}

/* #table .v-data-table__wrapper {
    margin-bottom: 60px;
} */
</style>