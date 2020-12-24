<template>
  <v-btn 
    v-if="like === true"
    fab
    small
    text
    color="primary"
  >
    <v-icon>{{ icons.like }}</v-icon>
  </v-btn>

  <v-btn 
    v-else
    fab
    small
    text
    color="primary"
  >
    <v-icon>{{ icons.dislike }}</v-icon>
  </v-btn>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mdiThumbUp, mdiThumbDown } from '@mdi/js';

@Component
export default class UserArticleRaiting extends Vue {
  private icons = {
    like: mdiThumbUp,
    dislike: mdiThumbDown,
  }

  @Prop() private isLike: boolean

  private get like() {
    return this.isLike
  }
}
</script>