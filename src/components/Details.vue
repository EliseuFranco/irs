<template>
  <section class="resumo-irs" v-if="Object.keys(resultados).length">
    <h2>Detalhes</h2>

    <div class="container">
      <div class="valores">
        <div class="item bruto radius">
          <span>Rendimento bruto</span>
          <strong>{{ resultados.rendimentoBruto }} €</strong>
        </div>
        <div class="item ss radius">
          <span>Segurança Social</span>
          <strong>{{ resultados.segurancaSocial }} €</strong>
        </div>
        <div class="item deducao radius">
          <span>Total de deduções</span>
          <strong>{{ resultados.totalDeducoes }} €</strong>
        </div>
        <div class="item coletavel radius">
          <span>Rendimento coletável</span>
          <strong>{{ resultados.rendimentoColetavel }} €</strong>
        </div>
        <div class="item destaque radius">
          <abbr title="No caso do valor do IRS ser negativo, significa que tens então IRS a receber se for positivo então é IRS a pagar">
            IRS a pagar / Receber <span class="special">&#33;</span>
          </abbr>
          <strong>{{ resultados.coletaFinal.toFixed(2) }} €</strong>
        </div>
      </div>
      <div class="detalhes">
        <h3>Taxas</h3>
        <div class="linha">
          <p class="taxa">Taxa efetiva <span> {{resultados.taxa_media ? resultados.taxa_media.toFixed(2) : 0}}%</span></p>
          <div class="bar radius">
            <div class="progress radius" :style="{'width': resultados.taxa_media + '%'}">

            </div>
          </div>
        </div>
        <div class="linha">
          <p class="taxa">Taxa marginal <span>{{resultados.taxa_normal ? resultados.taxa_normal.toFixed(2) : 0}}%</span></p>
          <div class="bar radius">
            <div class="progress radius" :style="{'width': resultados.taxa_normal + '%'}"></div>
          </div>
        </div>
      </div>
    </div>

    <p class="nota">
      Esta simulação é indicativa e baseia-se nas tabelas de IRS de 2024.
      Para um cálculo exato, consulte um contabilista ou utilize o Portal das Finanças.
    </p>
  </section>
</template>

<script>
export default {
  name: "Details",
  props: {
    resultados: {
      type: Object,
      default: () => ({})
    }
  }
  ,
  data(){
    return {
      taxaEfetiva: 20,
      taxaMarginal: 40
    }
  },
  computed: {
    hasResultado(){
      return this.resultados && Object.keys(this.resultados).length > 0
    }
  }
}
</script>

<style scoped>
.resumo-irs {
  /* background-color: #f9f9f9; */
  padding: 25px;
  border-radius: 12px;
  width: 100%;
  margin: 20px auto;
  font-family: Arial, sans-serif;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.container{
  width: 90%;
  max-width: 800px;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-radius: 5px;
}

.resumo-irs h2 {
  margin-bottom: 20px;
  color: #333;

}
.radius{
  border-radius: 8px;
}

.valores {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.item {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #444;
  padding: 10px;
}
.item strong {
  font-weight: bold;
  
}

.item.destaque {
  background-color: #eafaf3;
  padding: 10px;
  color: #189b5f;
}
.bruto{
  background-color: lightgray;
}
.ss{
  background-color: #eff6ff;
}
.deducao{
  background-color: #fff7ed;
}
.coletavel{
  background-image: linear-gradient(to right, #f0fdf5, #eff9fa, #eff7fe);
}
.bar{
  width: 100%;
  /* background-color: #222; */
  height: 18px;
  border: 1px solid rgba(0, 0, 0, 0.096);
  
}

.detalhes {
  margin-top: 20px;
  padding-top: 10px;
  border-top: 1px solid #ccc;
}

.detalhes h3 {
  margin-bottom: 10px;
  font-size: 16px;
  color: #222;
}

.linha {
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  color: #555;
  margin-bottom: 6px;

  flex-direction: column;
  gap: 10px
}
.progress{
  background: #222;
  height: 17px;
  width: 0;
}

.nota {
  margin-top: 20px;
  font-size: 13px;
  color: #777;
  line-height: 1.4;
}
.taxa{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

abbr{
  text-decoration: none;
}
.special{
  background-color: #81b8ff;
  padding: 3px 7px;
  border-radius: 50%;
  font-size: 12px;
  font-weight: bold;
}

@media screen and (max-width: 768px) {
  .container{
    width: 90vw;
  }
}
</style>
