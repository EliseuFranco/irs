<template>
    <section class="simulation-section">
        <div class="img">
            <img :src="calculatorImg" alt="calculator_img">
            <p>Dados para simulação </p>
        </div>
    </section>

</template>


<script>

    export default {
        name: 'simulation',

        data() {
            return {
                calculatorImg: '/calculator.svg'
            }
        }

    }

</script>

<style scoped>

    .simulation-section{
        display: flex;
        justify-content: center;
        align-content: center;
        margin-top: 50px;
        
    }

    .img{
        display: flex;
        align-items: center;
        width: 90%;
        max-width: 800px;
        gap: 20px;
        background-image: linear-gradient(to right, #2367dd, #1e839d, #189b5f);
        padding: 10px;
        border-radius: 10px;
        color: #fff;
        

    }

</style>