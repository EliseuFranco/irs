<template>

    <section class="result-container">
        <div class="result-content">
            <div class="content">
                <div v-if="chartData.datasets[0].data.length">
                   <Pie :data="chartData" :options="chartOptions"/>
                </div>
                <div v-else class="no-result">
                    <img :src="img_src" :alt="alt_text">
                    <h4>Aguardando Cálculo</h4>
                    <p>Preencha os dados e clique em "Calcular IRS" para ver os resultados</p>
                </div>
            </div>
        </div>
    </section>

</template>


<script>
    import ResultChart from '@/components/ResultChart.vue'
    import { Pie } from 'vue-chartjs';

    import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement} from 'chart.js'

    ChartJS.register(Title, Tooltip, Legend, ArcElement)

    export default {
        name: 'Results',
        props: {
            datachart: {
                type: Object,
            }
        },
        components: {
            ResultChart,
            Pie
        },
        data(){
            return {
                img_src: '/calculator2.svg',
                alt_text: 'calculator img',
            }
        },
        computed: {

            extractValues(){
                const values = Object.entries(this.datachart)
                .filter(([key]) => key !== 'taxa_normal' && key !== 'taxa_media')
                .map(([key, value]) => ({[key]: value}))
                .reduce((acc,curr) => {
                        return {...curr, ...acc}
                    }, {})
                return values
            },

            chartData(){
                return {
                    labels: Object.keys(this.extractValues),
                    datasets: [ { data: Object.values(this.extractValues), backgroundColor: ['navy', 'yellow', 'green']}]
                }
            },

            chartOptions(){
                return{
                    plugins: {
                        legend: {
                            labels: {
                                color: "#fff",
                                font: {
                                    size: 14,
                                    family: 'Arial',
                                    weight: 'bold'
                                }
                            }
                        }
                    },
                    responsive: true
                }
            }
        }
    }

</script>

<style scoped>

    .result-container {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-top: 20px;
        padding: 20px;
    }
    .result-content{
        width: 100%;
        max-width: 800px;
        background: #fff;
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.075);
        border-radius: 5px;
        padding: 30px;
        display: flex;
        justify-content: center;
    }
    .content{
        background-image: linear-gradient(to right, #2367dd, #1e839d, #189b5f);
        width: 100%;
        max-width: 500px;
        padding: 30px;
        border-radius: 5px;
        color: #fff;

        display: flex;
        justify-content:center;
        align-items: center;

    }
    .content p, span {
        font-size: 12px;
        padding: 5px 0;
    }
    .no-result{
        text-align: center;
    }

    @media screen and (max-width: 768px) {
        .content{
            gap: 30px;
        }
        .result-content{
            width: 90vw;
            padding: 10px;
        }
        
    }

</style>