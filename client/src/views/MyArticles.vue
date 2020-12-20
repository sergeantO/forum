<template>
   <v-container fluid grid-list-xl>
      <v-layout wrap justify-space-around>
        <v-flex xs8>
          <v-btn block color="primary" @click='createArticle'>Создать новую</v-btn>
        </v-flex>
        <v-flex xs8 v-for="article in myArticles" :key="article.id">
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
  private $router: any
  
  @App.Getter
  public myArticles!: boolean;

  createArticle() {
    console.log('create')
    this.$router.push('/new-article')
  }

  @App.Action
  private getMyArticles!: () => Promise<any>

  private icons = {
    mdiEye,
  }

  private created() {
    document.title = 'Мои статьи' // todo: не получать статьи, если они сохранены
    this.getMyArticles()
  }

};
</script>

<style scoped>

</style>
