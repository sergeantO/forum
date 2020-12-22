<template>
  <v-app-bar
    app
    color="#fff"
    elevation=2
    min-height=90
    height=90
    clipped-right
  >
    <!-- LOGO -->
    <router-link to='/' style='text-decoration: none'>
      <div class='logo'>
        <div class="d-flex align-center">
          <v-icon x-large color='primary' class="mr-5">{{ icons.mdiLibrary }}</v-icon>
          <h1>FORUM</h1>
        </div>
        <p>Публичная экспертиза идей</p>
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
      <span class="ml-3">Login</span>
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
  mdiLibrary,
} from '@mdi/js'

@Component({
  components: { Search },
})
export default class Header extends Vue {
  private icons = {
    mdiLogin,
    mdiLibrary,
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

<style scoped>
.logo {
  margin-top: 15px;
}

.logo  h1 {
  /*
    color: black;
    -webkit-text-fill-color: white;  Will override color (regardless of order)
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: black;
  */

  color: white;
  text-shadow:
   -1px -1px 0 #333,  
    1px -1px 0 #333,
    -1px 1px 0 #333,
     1px 1px 0 #333;
}

.logo > p {
  font-size: 14px;
  color: #000;
}
</style>