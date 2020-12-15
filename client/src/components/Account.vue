<template>
  <v-list-item link to='/Profile'>
    <v-list-item-avatar v-if="currentUser.image">
      <v-img src="https://randomuser.me/api/portraits/men/24.jpg"></v-img>
    </v-list-item-avatar>
    <v-list-item-icon v-else>
          <v-icon>{{ icons.mdiAccount }}</v-icon>
        </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title class="title">{{ currentUser.username }}</v-list-item-title>
      <v-list-item-subtitle>{{ currentUser.email }}</v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
const Auth = namespace('User');
const App = namespace('App');

import {
  mdiAccount,
} from '@mdi/js'

@Component
export default class Account extends Vue {
  private icons = {
    mdiAccount,
  }


  @Auth.State('user')
  private currentUser!: any;

}
</script>