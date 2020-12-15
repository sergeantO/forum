<template>
   <v-container fluid grid-list-xl>
      <v-layout wrap justify-space-around>
        <v-flex xs8 v-for="article in articles" :key="article.id">
          <article-prewiev :article="article"></article-prewiev>
        </v-flex>
      </v-layout>
    </v-container>
</template>



<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
const App = namespace('App');

import { mdiEye } from '@mdi/js';
import ArticlePrewiev from '../components/ArticlePrewiev.vue'

@Component({
  components: { 'article-prewiev': ArticlePrewiev },
})
export default class Article extends Vue {
  private icons = {
    mdiEye,
  }

  @App.Getter
  private articles!: boolean;

};
</script>

<style scoped>

</style>
