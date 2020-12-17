<template>
   <v-navigation-drawer 
    app
    v-model="drawer"
    light
    right
    clipped
  >
    <v-list>
      <Account></Account>
    </v-list>

    <v-divider></v-divider>

    <!-- MENU -->
    <v-list>
      <v-list-item
        v-for="item in items"
        :key="item.title"
        link
        :disabled="!item.to"
        :to="item.to"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <!-- END MENU -->

    <!-- LOGOUT -->
    <template v-slot:append>
      <div class="pa-2">
        <v-btn outlined block @click.prevent="logOut">
          <v-icon>{{ icons.mdiLogout }}</v-icon>
          <span class="mr-2">Выход</span>
        </v-btn>
      </div>
    </template>
    <!-- END LOGOUT -->
  </v-navigation-drawer>
</template> 


<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
const Auth = namespace('User');
const App = namespace('App');

import Account from './Account.vue'

import {
  mdiLogout,
  mdiAccountGroupOutline ,
  mdiAccountMultiplePlusOutline,
  mdiCogOutline,
  mdiTextBoxMultipleOutline,
  mdiNotePlusOutline
} from '@mdi/js'

@Component({
  components: { Account },
})
export default class Menu extends Vue {
  public $router: any; // bugfix

  private icons = {
    mdiLogout,
    myArticles: mdiTextBoxMultipleOutline,
    newInvite: mdiAccountMultiplePlusOutline,
    myTeams: mdiAccountGroupOutline,
    settings: mdiCogOutline,
    notes: mdiNotePlusOutline
  }

  private items = [
    { title: 'Мои статьи', icon: this.icons.myArticles, to: '/new-article' },
    { title: 'Мои заметки', icon: this.icons.notes, to: '/notes' },
    { title: 'Мои команды', icon: this.icons.myTeams, to: '' },
    { title: 'Пригласить', icon: this.icons.newInvite, to: '' },
    { title: 'Настройки', icon: this.icons.settings, to: '' },
  ]

  @App.Getter
  private isOpenDrawer!: boolean;

  private get drawer(): boolean {
    return this.isOpenDrawer
  }

  private set drawer(value: boolean) {
    return
  }

  @Auth.Action
  private signOut!: () => void;

  @App.Mutation
  private closeDrawer!: () => void

  private logOut() {
    this.closeDrawer()
    this.signOut();
    this.$router.push('/login');
  }

}
</script>