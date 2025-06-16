<template>
    <main>
      <HeaderComponent />
      <infoSection />
      <HowWork />
      <simulation />
      <FormComponent />
    </main>
</template>
<script>

  import HeaderComponent from '@/components/HeaderComponent.vue'
  import infoSection from '@/components/infoSection.vue'
  import HowWork from '@/components/HowWork.vue'
  import simulation from '@/components/simulation.vue'
  import FormComponent from '@/components/FormComponent.vue'
  import Results from '@/components/Results.vue'
  import Details from '@/components/Details.vue'
 
  
  export default {
    name: 'HelloWorld',
    components: {
      HeaderComponent,
      infoSection,
      HowWork, simulation,
      FormComponent,
      Results, Details,
    }
  }
</script>

