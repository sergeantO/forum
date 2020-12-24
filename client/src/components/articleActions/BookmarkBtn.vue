<template>
  <v-btn 
    v-if="isMarked"
    fab
    small
    text
    color="primary"
    @click="unbookmark"
  >
    <v-icon>{{ icons.mdiBookmark }}</v-icon>
  </v-btn>

  <v-btn 
    v-else
    fab
    small
    text
    color="primary"
    @click="bookmark"
  >
    <v-icon>{{ icons.mdiBookmarkOutline }}</v-icon>
  </v-btn>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mdiBookmark, mdiBookmarkOutline } from '@mdi/js';

@Component
export default class BookmarkBtn extends Vue {
  private icons = {
    mdiBookmark,
    mdiBookmarkOutline,
  }

  @Prop() private marked: boolean

  private get isMarked() {
    return this.marked
  }

  private bookmark() {
    this.$emit('bookmark')
  }

  private unbookmark() {
    this.$emit('unbookmark')
  }
}
</script>