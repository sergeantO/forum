<template>
  <v-row>
    <v-col offset="2">
      <v-btn-toggle v-model="toggle" group >
        <v-btn text><v-icon>{{ icons.like }}</v-icon> 500</v-btn>
        <v-btn text><v-icon>{{ icons.dislike }}</v-icon> 100</v-btn>
      </v-btn-toggle>
    </v-col>
    <v-col offset="2">
      <span>Likes: {{likes}}</span>
      <span>Dislike: {{dislike}}</span>
      <span>Views: {{views}}</span>
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

  private likes = 200
  private dislike = 30
  private views = 2000
  private get KPI() {
    return (this.likes - this.dislike) / this.views
  }
}
</script>