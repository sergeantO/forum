<template>
  <v-app-bar
    app
    color="#fff"
    elevation=2
    min-height=80
    height=80
    clipped-right
  >
    <!-- LOGO -->
    <router-link to='/' style='text-decoration: none'>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-5"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <h1>LOGO</h1>
      </div>
    </router-link>
    <!-- END LOGO -->

    <v-spacer></v-spacer>
    
    <v-btn
      v-if="!isLoggedIn"
      to="/Login"
      text
    >
      <v-icon>{{ icons.mdiLogin }}</v-icon>
      <span class="mr-2">Login</span>
    </v-btn>

    <Search v-if="isLoggedIn"></Search>

    <v-app-bar-nav-icon 
      v-if="isLoggedIn" 
      @click.stop="changeDrawerState"
      color="primary"
    ></v-app-bar-nav-icon>
    
  </v-app-bar>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import Search from './Search.vue'

const Auth = namespace('User');
const App = namespace('App');

import {
  mdiLogin,
} from '@mdi/js'

@Component({
  components: { Search },
})
export default class Header extends Vue {
  private icons = {
    mdiLogin,
  }

  @Auth.Getter
  private isLoggedIn!: boolean;

  @Auth.State('user')
  private currentUser!: any;

  private changeDrawerState() {
    this.$emit('clicked')
  }
}
</script>