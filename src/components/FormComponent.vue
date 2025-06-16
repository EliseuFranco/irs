<template>
    <section class="form-container">
        <form action="#" class="form" @submit.prevent="calcGrossSalary">
            <div class="form-content">
                <label for="rendimento">Rendimento bruto anual (€)</label>
                <input type="number" name="rendimento" id="rendimento" placeholder="Insira o montante" class="focus" v-model="rendimento">
            </div>
            <div class="form-content">
                <div class="civil-state">
                    <div class="conjuge content">
                        <label for="estado">Estado cívil</label>
                        
                        <select name="estado" id="estado" class="focus" v-model="estadoSelecionado">
                            <option value="" disabled>Escolha uma opção...</option>
                            <option v-for="(estado, index) in estado_civil" :value="estado.value" :key="index">{{ estado.label }}</option>
                            <!-- <option value="">Casado - tributação separada</option> -->
                        </select>
                    </div>

                     <div class="conjuge content">
                        <label for="dependentes">Dependentes</label>
                        <input type="number" name="dependentes" id="dependentes" min="0" class="focus" v-model="dependentes">

                        <div v-show="dependentes > 0">
                            <label for="idades">Idade dos dependentes</label>
                            <input type="text" id="idades" class="idades focus" placeholder="Insira a idade dos dependetes, separado por vírigula" v-model="ages">
                        </div>
                    </div>
                </div>
            </div>

            <div class="form-content">
                <div>
                    <label for="deducao">Deduções (opcional)</label>
                     <input type="checkbox" name="deducao" id="deducao" v-model="opcionals" :checked="!opcionals">
                </div>
                <div :class="['opcional', { visible: !visible }]">
                    <div class="contrib" v-show="opcionals">
                        <label for="contribuicao">Contribuições para sindicatos (€)</label>
                        <input type="number" name="contribuicao" id="contribuicao" class="focus" v-model="sindicato" placeholder="Contribuição sindical">
                    </div>

                    <div class="contrib" v-show="opcionals">
                        <label for="educacao">Gastos com educação</label>
                        <input type="number" name="educacao" id="educacao" class="focus" v-model="educacao" placeholder="Infomre o valor gasto com educação">
                    </div>

                    <div class="contrib" v-show="opcionals">
                        <label for="familia">Encargos com alimentação</label>
                        <input type="text" name="educacao" id="familia" class="focus" v-model="familia" placeholder="Informe o valor gasto por cada membro do agregado, separado por vírgula">
                    </div>
                </div>
            </div>
            <input type="submit" value="Calcular IRS">
        </form>
        <Results :datachart="results"/>
        <Details :resultados="results"/>
    </section>
</template>


<script>

    import Results from '@/components/Results.vue'
    import Details from '@/components/Details.vue'
    import {
        calcGastosComEducação,
        somaDeducoes, calcGastosComFamilia,
        bloquearTeclasInvalidas} from '../utils/util.js'

    export default {

        name: 'FormComponent',
        components: {
            Details,
            Results,
        },

        data(){
            return {
                rendimento: '',
                estado_civil : [
                    { label: 'Solteiro', value: 'solteiro' },
                    { label: 'Casado - tributação conjunta', value: 'casado_conjunta' },
                    { label: 'Casado - tributação separada', value: 'casado_separada' }
                ],
                estadoSelecionado: '',
                dependentes: 0,
                educacao: '',
                sindicato: '',
                familia: '',
                opcionals: false,
                visible: false,
                segurancaSocial: 0,
                activeCalcButton: false,
                deducaoSSLimite: 4104,
                segurancaSocialFee: 0.11,
                escaloes: [],
                results: {},
                ages: ''

            }
        },
        methods: {

           getEscalao(data, valor){
            console.log
                return data.find(es => es.rendimento_min >= valor && valor < es.rendimento_max )
           },
           calcQuotaSindical (grossAmount){
                return grossAmount * 0.01
           },
           calcSegurancaSocial(grossAmount){
                return grossAmount * this.segurancaSocialFee
           },

           calcRendimentoColetavel(grossAmount){
            
            if(grossAmount < 12180) {
                return 0
            }

            const calcAux = this.calcSegurancaSocial(grossAmount)
            this.segurancaSocial = calcAux < this.deducaoSSLimite ? this.deducaoSSLimite : calcAux

            const rendimentoColetavel = grossAmount - this.segurancaSocial // Substituir depois
            return rendimentoColetavel
           },

           calcDeducoesColeta(){
                // Continuar daqui
           },

           findEscalao(data, rendimentoColetavel){
            return data.find(es => {

                const max = Number(es.rendimento_max)
                const min = Number(es.rendimento_min)
                
                if(!min) return rendimentoColetavel < max
                else if (!max) return rendimentoColetavel >= min
                return rendimentoColetavel >= min && rendimentoColetavel < max;
            })
           },

           getEscaloesFees(escalao, taxa){
                return escalao[taxa]
           },
           calcColeta(data){

            if(!data){
                return 'no data to calculate'
            }
            console.log(data)
            return (Number(data.prevAmount) * data.taxaMedia) + (data.value - data.prevAmount) * data.normalTax
           },

           calcDeducaoPorDependentAcartgo(ages){
                const idades = ages.length > 0 ? ages.split(',') : ''
                let total = 0

                if(!ages){
                    console.log("Nenhuma idade foi informada")
                    return 0
                }
                else if (idades.length != this.dependentes){
                    console.log("As idades excedem o número de depenedentes")
                    return 0
                }
                idades.forEach(element => {
                    const idade = Number(element)

                    if (idade <= 3){
                        total += 726
                    } else if(idade > 3) total += 600
                    
                });
                return total
           },
           async loadEscaloes(){

            try {
                const response = await fetch('/escalao_irs.json')
                const data = await response.json()

                if (!data){
                    return null
                }
                return data
            } catch (error) {
                
            }
           },

           async calcGrossSalary(){

                const data = await this.loadEscaloes()
                if (!data) {
                    console.log("Erro ao obter os escalões")
                    return
                }

                if (!this.rendimento) {
                    alert("Informe o valor do rendimento bruto")
                    return
                }

                const rendimentoBruto = Number(this.rendimento)
                const rendimentoColetavel = this.calcRendimentoColetavel(rendimentoBruto)

                const currentEscalao = this.findEscalao(data, rendimentoColetavel)
                const index = data.findIndex(es => es.escalao === currentEscalao.escalao)

                const prevEscalao = index > 0 ? data.at(index - 1) : currentEscalao

                let taxa_normal = currentEscalao.taxa_normal / 100
                let taxa_media = prevEscalao.taxa_media / 100
                const prevAmount = prevEscalao.rendimento_max
                const coleta = (prevAmount * taxa_media) + ((rendimentoColetavel - prevAmount) * taxa_normal)
                const deducaoDependentes = this.calcDeducaoPorDependentAcartgo(this.ages)
                const gastosComEducacao = this.educacao ? calcGastosComEducação(Number(this.educacao)) : 0
                const gastosComFamilia = this.familia ? calcGastosComFamilia(this.familia) : 0
                const coletaFinal = coleta - deducaoDependentes - gastosComEducacao
                const totalDeducoes = somaDeducoes(deducaoDependentes,gastosComEducacao)

 
                // console.log(coletaFinal)
                // console.log("Rendimento coletavel: ", rendimentoColetavel)
                // console.log('Coleta IRS: ', coleta.toFixed(2))

                taxa_media *= 100
                taxa_normal *= 100 

            //    console.log( this.calcDeducaoPorDependentAcartgo(this.ages) )
               console.log(calcGastosComEducação(Number(this.educacao)))
               console.log(this.familia)
               
                this.results = {
                    rendimentoBruto,
                    rendimentoColetavel,
                    taxa_normal,
                    taxa_media,
                    segurancaSocial: this.calcSegurancaSocial(rendimentoBruto),
                    coletaFinal,
                    totalDeducoes
                }
            }
        },
        async mounted(){
            this.escaloes = await this.loadEscaloes()
            document.addEventListener('keydown', bloquearTeclasInvalidas)
        }
    }
</script>


<style scoped>
    .form-container{
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
        padding: 20px;
    }
    .form{
        width: 90%;
        max-width: 800px;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .form-content{
        display: flex;
        flex-direction: column;
        gap: 10px;
        justify-content: flex-start;
        width: 100%;
    }
    .content{
        flex: auto;
    }
    .civil-state{
        display: flex;
        gap: 10px;
    }
    .conjuge{
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .opcional{
        margin-top: -15px;
        visibility: hidden;
        opacity: 0;
        transition: all ease-in 0.3s;
    }
    label{
        display: block;
        font-weight: 500;
        margin-bottom: 4px;
        margin: 5px;
    }
    .visible{
        visibility: visible;
        opacity: 1;
    }
    input[type=checkbox]{
        margin-top: 5px;
        margin-left: 7.5px;
    }
 
     #rendimento, #dependentes, #estado, #contribuicao, #educacao,.idades, #familia{
        height: 40px;
        border-radius: 5px;
        border: 1px solid rgba(0, 0, 0, 0.253);
        outline: none;
        width: 100%;
        padding-left: 10px;
    }
    .focus:focus{
        box-shadow: 0 0 5px 2px #2db38f8e;
    }
    .contrib{
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 10px;
    }
    .contrib label{
        padding-top: 10px;
    }

    input[type=submit]{
        cursor: pointer;
        border-radius: 5px;
        border:  1px solid rgba(0, 0, 0, 0.055);
        background-image: linear-gradient(to right, #2367dd, #1e839d, #189b5f);
        font-size: 16px;
        color: #fff;
        font-weight: bold;
        padding: 10px;
    }
    
</style>