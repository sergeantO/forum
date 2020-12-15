<template>
  <div style="display: inline-flex;">
    <v-slide-x-reverse-transition>
      <v-combobox
        v-if="isOpenSearch"
        v-model="select"
        :items="items"
        clearable
        hide-selected
        multiple
        small-chips
        dense
        solo
        light
        hide-details
        class='mr-3'
      ></v-combobox>
    </v-slide-x-reverse-transition>

    <v-btn
      text
      fab
      small
      @click="isOpenSearch = !isOpenSearch"
    >
      <v-icon>{{ icons.search }}</v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// import { namespace } from 'vuex-class';

import {
  mdiMagnify,
} from '@mdi/js'

// const Auth = namespace('User');
// const App = namespace('App');

@Component
export default class Search extends Vue {
  private icons = {
    search: mdiMagnify,
  }

  private select = ['Vuetify', 'Programming']

  private items = [
    'Programming',
    'Design',
    'Vue',
    'Vuetify',
  ]

  private isOpenSearch = false

}
</script>