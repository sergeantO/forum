<template>
  <v-row>
    <v-col offset="2">
      <v-btn-toggle v-model="toggle" group >
        <v-btn text><v-icon>{{ icons.like }}</v-icon> 500</v-btn>
        <v-btn text><v-icon>{{ icons.dislike }}</v-icon> 100</v-btn>
      </v-btn-toggle>
    </v-col>
    <v-col offset="2">
      <span>Likes: {{Likes}}</span>
      <span>Dislike: {{Dislike}}</span>
      <span>Views: {{Views}}</span>
      <span>KPI: {{KPI}}</span>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

import { mdiThumbUp, mdiThumbDown } from '@mdi/js';

@Component
export default class ArticleActions extends Vue {
  private icons = {
    like: mdiThumbUp,
    dislike: mdiThumbDown,
  }

  private toggle = null
  
  private Likes = 200
  private Dislike = 30
  private Views = 2000
  private get KPI () {
    return (this.Likes-this.Dislike)/this.Views
  }
}
</script>