<template>
  <div>
    <HeaderComponent></HeaderComponent>
    <LogoSvg class="col-lg-12 col-3 title"></LogoSvg>
  </div>
</template>

<script>
import LogoSvg from "./components/LogoSvg";
import HeaderComponent from "./components/HeaderComponent";

export default {
  name: "App",
  components: {
    LogoSvg,
    HeaderComponent,
  },
};
</script>

<style>
</style>
