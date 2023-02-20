<template>
    <div>
        <v-row class="mt-10 mb-5">
            <v-col class="ml-7">
                    <v-btn-toggle v-model="selectData" rounded :dense="true" :mandatory="true">
                        {{ selectData }}
                        <v-btn>
                            <span>Precio</span>
                        </v-btn>
                        <v-btn>
                            <span>Cap. de mercado</span>
                        </v-btn>
                        <v-btn>
                            <span>Gráfico de Velas</span>
                        </v-btn>
                    </v-btn-toggle>
            </v-col>
            <v-col class="d-flex justify-end mr-3">
                    <v-btn-toggle v-model="selectTimestamp" rounded :dense="true" :mandatory="true">
                        <!-- {{this.timestampSelected(selectTimestamp)}} -->
                        <v-btn>
                            <span>1D</span>
                        </v-btn>
                        <v-btn>
                            <span>7D</span>
                        </v-btn>
                        <v-btn>
                            <span>1M</span>
                        </v-btn>
                        <v-btn>
                            <span>3M</span>
                        </v-btn>
                        <v-btn>
                            <span>1Y</span>
                        </v-btn>
                        <v-btn>
                            <span>YTD</span>
                        </v-btn>
                        <v-btn>
                            <span>ALL</span>
                        </v-btn>
                        <v-btn>
                            <v-icon>mdi-calendar</v-icon>
                        </v-btn>
                        <v-btn>
                            <span>LOG</span>
                        </v-btn>
                </v-btn-toggle>
            </v-col>
        </v-row>
        <LineChartGenerator
            v-show ="visibleGraphs"
            :chart-options="chartOptions"
            :chart-data="chartDataSwitchCase(selectData)"
            :chart-id="chartId"
            :dataset-id-key="datasetIdKey"
            :plugins="plugins"
            :css-classes="cssClasses"
            :styles="styles"
            :width="width"
            :height="height"
        />
        <trading-vue 
            v-if ="visibleTrading" 
            :data="this.$data" 
            :width="1450"
            >
        </trading-vue>
        <v-row class="mt-13 ml-2">
            <span class="text-h4 font-weight-black">Convertidor de BTC a USD</span>
        </v-row>
        <v-container class="mb-8 mt-8 border">
            <v-row class="mt-13">
                <v-img v-if="switchBoolean" :src="coinData.image.large" max-height="50px" max-width="50px" class="mt-2 ml-12"></v-img><v-col v-if="switchBoolean" class="d-flex justify-start">{{coinData.symbol.toUpperCase()}}<br>{{coinData.name}}</v-col>
                <v-img v-if="!switchBoolean" src="../assets/USD.svg" max-height="50px" max-width="50px" class="mt-2 ml-12"></v-img><v-col v-if="!switchBoolean" class="">USD<br>United State Dollar</v-col>
                <v-text-field v-if="switchBoolean" background-color="rgba(247,247,247,255)" flat solo class="mt-3" v-model="priceCripto"></v-text-field>
                <v-text-field v-if="!switchBoolean" background-color="rgba(247,247,247,255)" flat solo class="d-flex justify-end mt-3" v-model="priceDollar"></v-text-field>
                <v-col class="mr-12"><v-btn class="mr-12" @click="switchMethod()" color="white"><v-icon>mdi-swap-horizontal</v-icon></v-btn></v-col>
                <v-img v-if="switchBoolean" src="../assets/USD.svg" max-height="50px" max-width="50px" class="mt-2 ml-12"></v-img><v-col v-if="switchBoolean" class="">USD<br>United State Dollar</v-col>
                <v-img v-if="!switchBoolean" :src="coinData.image.large" max-height="50px" max-width="50px" class="mt-2"></v-img><v-col v-if="!switchBoolean" class="d-flex justify-start">{{coinData.symbol.toUpperCase()}}<br>{{coinData.name}}</v-col>
                <v-text-field v-if="switchBoolean" background-color="rgba(247,247,247,255)" flat solo class="d-flex justify-end mt-3" v-model="priceInDollars"></v-text-field>
                <v-text-field v-if="!switchBoolean" background-color="rgba(247,247,247,255)" flat solo class="mt-3" v-model="priceInCrypto"></v-text-field>
            </v-row>
        </v-container>
    </div>
</template>

<script lang="ts">

import Vue from "vue";

import { Line as LineChartGenerator } from "vue-chartjs/legacy";
import {Chart as ChartJS,Title,Tooltip,Legend,LineElement,LinearScale,CategoryScale,PointElement,} from "chart.js";
import TradingVue from 'trading-vue-js';
import numeral from 'numeral'

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    CategoryScale,
    PointElement
);

export default Vue.extend({
    name: "LineChart",

    components: {
    LineChartGenerator,
    TradingVue 
    },
    props: {
        chartId: {
        type: String,
        default: "line-chart",
        },
        datasetIdKey: {
        type: String,
        default: "label",
        },
        width: {
        type: Number,
        default: 1500,
        },
        height: {
        type: Number,
        default: 400,
        },
        cssClasses: {
        default: "",
        type: String,
        },
        styles: {
        type: Object,
        default: () => {},
        },
        plugins: {
        type: Array,
        default: () => [],
        },
    },
    data() {
        return {
            priceCripto: 1,
            priceDollar:0,
            switchBoolean: true,
            coinData: {},
            dataPrice: {},
            dataMarket: {},
            selectData:'',
            selectTimestamp:'',
            priceTimestamps: [],
            priceValues: [],
            marketCapsValues: [],
            priceData: {},
            marketCaps: {},
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: "top",
                        align: "start",
                        display: false,
                        labels: {
                            padding: 10,
                        }
                            },
                        }
            },
            ohlcv: [
                    [ 1551128400000, 33,  37.1, 14,  14,  196 ],
                    [ 1551132000000, 13.7, 30, 6.6,  30,  206 ],
                    [ 1551135600000, 29.9, 33, 21.3, 21.8, 74 ],
                    [ 1551139200000, 21.7, 25.9, 18, 24,  140 ],
                    [ 1551142800000, 24.1, 24.1, 24, 24.1, 29 ],
                ],
            componentVisible: true as boolean
            };
    },
    computed: {
        chartDataComputed():any {
            return this.chartDataSwitchCase('');
        },

        visibleGraphs():any {
            return (this.selectData === 2) ? this.componentVisible = false : this.componentVisible = true
        },
        
        visibleTrading():any {
            return (this.selectData === 2) ? this.componentVisible = true : this.componentVisible = false
        },

        priceInDollars(): any {
            return numeral(this.priceCripto * this.coinData.market_data.current_price.usd).format('0,0.00');
        },

        priceInCrypto(): any {
            return numeral(this.priceDollar / this.coinData.market_data.current_price.usd).format('0,0.00');
        },

    },
    watch:{
        async selectTimestamp(): Promise<void> {
            await this.getPrice();
            await this.getPriceInterval();
        },
    },
    methods: {
        chartDataSwitchCase(data:any): any {
            switch (data) {
                case 0:
                    return this.priceData;
                case 1:
                    return this.marketCaps;
                case 2:
                    return this.chartData2;
                default:
                    return this.priceData;
            }
        },

        timestampSelected(selectTimestamp:number): string {
            switch (selectTimestamp) {
                case 0:
                    return '24h';
                case 1:
                    return '7';
                case 2: 
                    return '30';
                case 3: 
                    return '90';
                case 4: 
                    return '365';
                case 5:
                    return 'Year-To-Date'
                case 6:
                    return 'all'
                case 7: 
                    return 'calendar'
                case 8:
                    return 'log'
                default:
                    return '';
            }
        },

        async getPrice() {
            let url = `https://api.coingecko.com/api/v3/`;
            const id = this.$route.params.id

            await this.axios.get(`${url}coins/${id}/market_chart?vs_currency=usd&days=${this.timestampSelected(this.selectTimestamp)}&interval=daily`)
                .then((response) => {

                this.dataPrice = response.data.prices;
                this.dataMarket = response.data.market_caps;

                this.priceTimestamps = this.dataPrice.map((item:any) => this.fromMilesecondsToDays(item[0]));

                const timestamps = [...this.priceTimestamps];
                timestamps.length = timestamps.length - 1

                this.priceValues = this.dataPrice.map((item:any) => item[1]);
                this.marketCapsValues = this.dataMarket.map((item:any) => item[1]);
                
                this.priceData = {
                    labels: timestamps,
                    datasets: [
                        {
                            label: "Precio",
                            backgroundColor: "red",
                            data: this.priceValues,
                        },
                    ],
                };

                this.marketCaps = {
                    labels: timestamps,
                    datasets: [
                        {
                            label: "Precio",
                            backgroundColor: "red",
                            data: this.marketCapsValues,
                        },
                    ],
                };

            })
            .catch((error) => {
                console.log(error);
            });
        },

        async getPriceInterval(){
            let url = `https://api.coingecko.com/api/v3/`;
            const id = this.$route.params.id ;
            let date = new Date();
            let timeActual = date.getTime();
            let last24Hours = timeActual - 86400000;

            await this.axios.get(`${url}coins/${id}/market_chart/range?vs_currency=usd&from=1673811004539&to=1673897368183`)
                .then((response) => {

                    this.dataPrice = response.data.prices;
                    this.dataMarket = response.data.market_caps;

                    this.priceTimestamps = this.dataPrice.map((item:any) => this.fromMilesecondsToDays(item[0]));

                const timestamps = [...this.priceTimestamps];
                timestamps.length = timestamps.length - 1

                this.priceValues = this.dataPrice.map((item:any) => item[1]);
                this.marketCapsValues = this.dataMarket.map((item:any) => item[1]);
                
                this.priceData = {
                    labels: timestamps,
                    datasets: [
                        {
                            label: "Precio",
                            backgroundColor: "red",
                            data: this.priceValues,
                        },
                    ],
                };

                this.marketCaps = {
                    labels: timestamps,
                    datasets: [
                        {
                            label: "Precio",
                            backgroundColor: "red",
                            data: this.marketCapsValues,
                        },
                    ],
                };

            })
            .catch((error) => {
                console.log(error);
            });
        },
        
        fromMilesecondsToDays(mileseconds: any) {
            let date = new Date(parseInt(mileseconds));
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            let timeActual = date.getTime();
            return day;
        },

        async getCoin() {
            let url = `https://api.coingecko.com/api/v3/`;
            const id = this.$route.params.id
            this.loading = true;
            await this.axios.get(`${url}/coins/${id}`)
                .then((response) => {
                    //console.log('response >>>', response);
                    this.coinData = response.data;
                    console.log(this.coinData.market_data.current_price.usd)
                    //console.log('asset >>>', this.asset);
                })
                .catch((error) => {
                    //console.log(error);
                });
            //console.log(this.asset)
        },

        switchMethod() {
            this.switchBoolean = !this.switchBoolean;
            console.log(this.switchBoolean)
        },  
            
        },
        created() {
        this.getCoin();
        let date = new Date();
        let timeActual = date.getTime();
        let last24Hours = timeActual - 86400000;
        console.log('timeActual', timeActual);
        console.log('last24Hours',last24Hours);
        console.log('Date.now',Date.now());

        const tiempoTranscurrido = Date.now();
        const hoy = new Date(tiempoTranscurrido);
        console.log('hoy', hoy);
        var now = new Date(). getTime();
        console.log('now', now);
        var now2 = Date.now()   
        console.log('now', now2);
        let last24Hours2 = now2 - 86400000;
        console.log('last24Hours2', last24Hours2);
        }
});
</script>

<style scope>

.border {
    border: 1px solid rgb(239, 242, 245);
    border-radius: 10px;
    padding: 10px;
    margin: 10px;
    background-color:  rgba(247,247,247,255);
}

</style>
