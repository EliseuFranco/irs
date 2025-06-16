<template>
    <section class="container-how-works">

        <!-- Como funciona 1 -->
        <div class="content">
            <div class="how">
                <div class="number first"><span>1</span></div>
                <h5>Insira os Dados</h5>
                <p>Introduza o seu rendimento anual, estado civil e número de dependentes</p>
            </div>
            <!-- Como funciona 2 -->
            <div class="how">
                <div class="number second"><span>2</span></div>
                <h5>Cálculo Automático</h5>
                <p>O sistema calcula automaticamente os escalões e deduções aplicáveis</p>
            </div>
            <!-- Como funciona 3 -->
            <div class="how">
                <div class="number third"><span>3</span></div>
                <h5>Veja os Resultados</h5>
                <p>Visualize o IRS a pagar, taxa efetiva e rendimento líquido</p>
            </div>
        </div>
    </section>

</template>


<script>

    export default {
        name: 'HowWork'
    }

</script>


<style scoped>

    body{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .container-how-works{

        width: 100%;
        margin-top: 50px;
        display: flex;
        gap: 10px;
        justify-content: center;
        align-items: center;
    }
    .content{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        max-width: 800px;
        gap: 20px;

        padding: 50px;
        background-color: white;
        border-radius:10px ;
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.082);

        transition: 0.3s;
    }

    .how {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 20px;
        flex: auto;
    }
     .how  p {
        opacity: 0.7;
        font-size: 14px;
    }
    
    .number{
        background: black;
        padding: 20px 30px;
        border-radius: 50%;
        font-weight: bold;
        font-size: 25px;
    }
   
    .first{
        background: #dbeafe;
        color: #2563eb;
    }
    .second {
        background: #dcfce7;
        color: #16a34a;
    }
    .third{
        background: #f3e8ff;
        color: #9336ea;
    }
    h3{
        text-align: center;
    }
    h5{
        text-align: center;
        font-weight: bold;
    }
    .how p {
        text-align: center;font-size: 15px;
        line-height: 20px;
        opacity: 0.6;
    }

    @media screen and (max-width: 768px) {
        .content{
            flex-direction: column;
            width: 90%;
        }
        .how{
            max-width: 300px;
        }
    }


</style>