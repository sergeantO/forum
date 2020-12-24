<template>
  <div style="display: inline-flex;">
    <v-slide-x-reverse-transition>
      <tags-provider  
        v-if="isOpenSearch" 
        :tags="select"
        @update:tags="onUpdateTags"
      />
    </v-slide-x-reverse-transition>

    <v-btn
      text
      fab
      small
      @click="isOpenSearch = !isOpenSearch"
      class='ml-3'
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

import TagsProvider from '../components/TagsProvider.vue'

import {
  mdiMagnify,
} from '@mdi/js'

@Component({
  components: {
    'tags-provider': TagsProvider,
  },
})
export default class Search extends Vue {
  @App.Mutation
  private setTags!: (tags: string[]) => void

  @App.State('tags')
  private tags!: string[]

  private icons = { search: mdiMagnify }
  private select: string[] = []
  private isOpenSearch = false

  private mounted() {
    this.select = this.tags
  }

  private onUpdateTags(val: string[]) {
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