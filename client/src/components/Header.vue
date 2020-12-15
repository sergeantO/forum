<template>
  <v-app-bar
    app
    color="primary"
    dark
    flat
    clipped-right
  >
    <!-- LOGO -->
    <router-link to='/'>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
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

  @App.Action
  private changeDrawerState!: () => void;
}
</script>