<template>
  <div id="app">
      <helloWorld />
  </div>
</template>


<script>

  import HelloWorld from '@/components/HelloWorld.vue'


  export default {
    components: {
        HelloWorld
    }
  }

</script>


<style>

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  body{
    background-color: #f0fbf8;
    font-family: Arial, Helvetica, sans-serif;
  }

</style>