<template>
  <v-app>
    <Menu></Menu>
    <Header></Header>
    <v-main>
      <router-view></router-view>
    </v-main>

    <Footer></Footer>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Header from './components/Header.vue';
import Menu from './components/Menu.vue';
import Footer from './components/Footer.vue';

export default Vue.extend({
  name: 'App',

  components: {
    Header,
    Menu,
    Footer,
  },

  data: () => ({
  }),
});
</script>
