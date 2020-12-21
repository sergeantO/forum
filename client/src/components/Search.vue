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
        outlined
        color="primary"
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
      color="primary"
    >
      <v-icon>{{ icons.search }}</v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
const App = namespace('App')

import {
  mdiMagnify,
} from '@mdi/js'

@Component
export default class Search extends Vue {
  @App.Mutation
  private setTags!: (tags: string[]) => void

  @App.State('tags')
  private tags!: string[]

  private icons = {
    search: mdiMagnify,
  }

  private select: string[] = []

  private items = [
    'Programming',
    'Design',
    'Vue',
    'Vuetify',
  ]

  private isOpenSearch = false

  private mounted() {
    this.select = this.tags
  }

  @Watch('select')
  private onChildChanged(val: string[], oldVal: string[]) {
    if (this.tags !== val) {
      this.setTags(val)
    }
  }

  @Watch('tags')
  private onTagsChanged(val: string[], oldVal: string[]) {
    if (this.select !== val) {
      this.select = val
      this.isOpenSearch = true
    }
  }

}
</script>