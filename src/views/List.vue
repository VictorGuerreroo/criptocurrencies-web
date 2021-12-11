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
                    <template v-slot:item.image="{ item }">
                        <v-img :src="item.image" :alt="item.name" height="30px" width="30px"></v-img>
                    </template>

                    <template v-slot:item.current_price="{ item }">
                        <span>{{item.current_price | dollar}}</span>
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
                { text: 'Coin', sortable: false, value: 'name', align: 'start', class:'black--text' },
                { text: 'Symbol', sortable: false, value: 'symbol', align: 'start', class:'black--text' },
                { text: 'Image', sortable: false, value: 'image', align: 'start', class:'black--text' },
                { text: 'Price', value: 'current_price', align: 'start', class:'black--text' },
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