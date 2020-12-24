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
  private readonly isSearch: boolean = true

  @Prop()
  private tags!: string[]

  private selectedTags: string[] = []

  @App.State('popularTags')
  private popularTags!: string[]

  private settings = {
    dense: true,
    outlined: true,
    label: 'Теги',
  }

  private mounted() {
    this.selectedTags = this.tags

    if (this.isSearch) {
      this.settings.label = ''
    } else {
      this.settings.dense = false
      this.settings.outlined = false
    }
  }

  @Watch('selectedTags')
  private onChengeSelectedTags(val: string[]) {
    const newTags = val.map((v) => v.trim()).filter((v) => !!v)
    this.$emit('update:tags', newTags)
  }
}
</script>