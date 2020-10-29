<template>
  <div
    id="contacts"
    class="contacts"
    style="position: relative; background-color: #fff; z-index: 2"
  >
    <div class="index">Contacts</div>
    <div class="container" style="height: 100vh">
      <div class="title">designer</div>
      <div class="row designer">
        <div class="col-lg-9 col-auto p-0">
          <img class="mx-auto" src="images/myphoto.jpg" />
        </div>
        <div class="col-lg-3 col-auto name">
          <div class="chi">韓志群</div>
          <div class="eng">chih- chun, han</div>
        </div>
      </div>
      <div class="email">{{_staEmail}}</div>
      <div class="phone">{{_staPhone}}</div>
      <div class="URL">
        <a :href="_staGithub" target="_blank">
          <img src="images/github-brands.svg" />
        </a>
        <a :href="_staBehance" target="_blank">
          <img src="images/behance-square-brands.svg" />
        </a>
      </div>
      <div class="right">{{_staRight}}</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      _staEmail: (state) => state.contacts.static.email,
      _staPhone: (state) => state.contacts.static.phone,
      _staGithub: (state) => state.contacts.static.github,
      _staBehance: (state) => state.contacts.static.behance,
      _staRight: (state) => state.contacts.static.right,
    }),
  },
};
</script>

<style lang="scss" scoped>
</style>