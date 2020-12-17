<template>
  <v-app>
    <Menu></Menu>
    <Header></Header>
    <v-main>
      <router-view></router-view>
    </v-main>

    <Footer></Footer>

    <Notification @closed='onClosedNotification' />
  </v-app>
</template>

<script lang="ts">
import { Component, Prop, Ref, Vue, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
const AppState = namespace('App');

import Header from './components/Header.vue';
import Menu from './components/Menu.vue';
import Footer from './components/Footer.vue';
import Notification from './components/Notification.vue';

@Component({
  components: {
    Header,
    Menu,
    Footer,
    Notification,
  },
})
export default class App extends Vue {
  @AppState.Mutation
  private readingError!: () => void

  private onClosedNotification() {
    setTimeout(this.readingError, 500)
  }

  // @AppState.Mutation
  // private errorPush!: (errors: string[]) => void
}
</script>
