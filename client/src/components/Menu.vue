<template>
   <v-navigation-drawer 
    app
    v-model="isOpenDrawer"
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
import { Component, PropSync, Vue } from 'vue-property-decorator';
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
  mdiNotePlusOutline,
  mdiGavel,
  mdiBookmarkMultipleOutline,
} from '@mdi/js'

@Component({
  components: { Account },
})
export default class Menu extends Vue {
  public $router: any; // bugfix

  @PropSync('drawer', { type: Boolean })
  private isOpenDrawer!: boolean

  private icons = {
    mdiLogout,
    myArticles: mdiTextBoxMultipleOutline,
    newInvite: mdiAccountMultiplePlusOutline,
    myTeams: mdiAccountGroupOutline,
    settings: mdiCogOutline,
    notes: mdiNotePlusOutline,
    gavel: mdiGavel,
    bookmarks: mdiBookmarkMultipleOutline,
  }

  private items = [
    { title: 'Мои статьи', icon: this.icons.myArticles, to: '/my-articles' },
    { title: 'Мои закладки', icon: this.icons.bookmarks, to: '' },
    { title: 'Мои заметки', icon: this.icons.notes, to: '/notes' },
    { title: 'Мои команды', icon: this.icons.myTeams, to: '' },
    { title: 'Модерация', icon: this.icons.gavel, to: '' },
    { title: 'Пригласить', icon: this.icons.newInvite, to: '' },
    { title: 'Настройки', icon: this.icons.settings, to: '' },
  ]

  @Auth.Action
  private signOut!: () => void

  private logOut() {
    this.$emit('update:drawer', false)
    this.signOut()
    this.$router.push('/login')
  }

}
</script>