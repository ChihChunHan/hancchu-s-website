<template>
  <div class="particles" id="particles-js"></div>
</template>

<script>
import particlesJS from "particles.js";
console.log(particlesJS.load());
// particlesJS.load('particles-js', '../../particles.json', function() {
//   console.log('callback - particles-js config loaded');
// });



export default {};
</script>

<style lang="scss" scoped>
  .particles{
    height: 100vh;
  }
</style>