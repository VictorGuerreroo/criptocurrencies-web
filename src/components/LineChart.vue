<template>
    <div>
        <v-row class="mt-10">
            <v-col class="ml-7">
                    <v-btn-toggle v-model="toggle_exclusive" rounded :dense="true">
                        <v-btn>
                            <span @click="getPrice()">Precio</span>
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
                    <v-btn-toggle rounded :dense="true">
                        <v-btn>
                            <span @click="getPrice()">1D</span>
                        </v-btn>
                        <v-btn>
                            <span @click="fromMilesecondsToDays(1667303737000)">7D</span>
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
            :chart-options="chartOptions"
            :chart-data="chartDataSwitchCase(toggle_exclusive)"
            :chart-id="chartId"
            :dataset-id-key="datasetIdKey"
            :plugins="plugins"
            :css-classes="cssClasses"
            :styles="styles"
            :width="width"
            :height="height"
            />
    </div>
</template>

<script lang="ts">

import Vue from "vue";

import { Line as LineChartGenerator } from "vue-chartjs/legacy";
import {Chart as ChartJS,Title,Tooltip,Legend,LineElement,LinearScale,CategoryScale,PointElement,} from "chart.js";

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
        dataPrice: {},
        toggle_exclusive:'',
        priceTimestamps: [],
        priceValues: [],
        charData1: {},
        chartData: {
            labels: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
            ],
            datasets: [
                {
                    label: "Precio",
                    backgroundColor: "red",
                    borderColor: "red",
                    //fillStyle: "white",
                    //hidden: true,
                    data: [40, 39, 10, 40, 39, 80, 40],
                },
                {
                    label: "Cap. de mercado",
                    backgroundColor: "blue",
                    data: [40, 39, 10, 40, 39, 80, 40],
                },
                {
                    label: "Grafico de Velas",
                    backgroundColor: "green",
                    data: [40, 39, 10, 40, 39, 80, 40],
                },
            ],
        },
        chartData1: {
            labels: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
            ],
            datasets: [
                {
                    label: "Grafico de Velas",
                    backgroundColor: "green",
                    data: [1667260800000, 20731.682756632563],
                },
            ],
        },
        chartData2: {
            labels: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
            ],
            datasets: [
                {
                    label: "Cap. de mercado",
                    backgroundColor: "blue",
                    data: [40, 39, 10, 40, 39, 80, 40],
                },
            ],
        },
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
            };
    },

    computed: {
        chartDataComputed():any {
            return this.chartDataSwitchCase('');
        },
    },
    methods: {
        chartDataSwitchCase(data:any): any {
            switch (data) {
                case 0:
                    return this.chartData;
                case 1:
                    return this.charData1;
                case 2:
                    return this.chartData2;
                default:
                    return this.chartData;
            }
        },
        async getPrice() {
            let url = `https://api.coingecko.com/api/v3/`;
            const id = this.$route.params.id
            await this.axios.get(`${url}coins/${id}/market_chart?vs_currency=eur&days=7&interval=daily`)
            .then((response) => {
                //console.log(response)
                this.dataPrice = response.data.prices;
                //console.log(this.dataPrice);
                this.priceTimestamps = this.dataPrice.map((item:any) => this.fromMilesecondsToDays(item[0]));
                //console.log('This priceTimestamps only', this.priceTimestamps);
                this.priceValues = this.dataPrice.map((item:any) => item[1]);
                this.charData1 = {
                    labels: this.priceTimestamps,
                    datasets: [
                        {
                            label: "Precio",
                            backgroundColor: "red",
                            data: this.priceValues,
                        },
                    ],
                };
        
                //console.log('Timestamp',this.fromMilesecondsToDays(this.priceTimestamps));
                //console.log(this.priceValues);

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
            //console.log(day, month, year);
            return day;
        },
            
        },
        created() {
        this.getPrice();
        console.log(this.getPrice());
        }
});
</script>
