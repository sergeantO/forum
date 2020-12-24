<template>
  <v-combobox
    v-model="selectedTags"
    :items="popularTags"
    clearable
    multiple
    small-chips
    hide-selected
    deletable-chips
    hide-details

    :dense = "settings.dense"
    :outlined = "settings.dense"
    :label="settings.label"
  ></v-combobox>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
const App = namespace('App')

import {
  mdiMagnify,
} from '@mdi/js'

@Component
export default class TagsProvider extends Vue {
  @Prop({ default: true, type: Boolean })
  private readonly isSearch: boolean

  @PropSync('tags', { type: Array })
  private selectedTags!: string[]

  @App.State('popularTags')
  private popularTags!: string[]

  private settings = {
    dense: true,
    outlined: true,
    label: 'Теги',
  }

  private mounted() {
    if (this.isSearch) {
      this.settings.label = ''
    } else {
      this.settings.dense = false
      this.settings.outlined = false
    }
  }
}
</script>