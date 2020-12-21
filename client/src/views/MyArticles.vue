<template>
  <v-container fluid>
    <v-row>
      <v-col cols=8 offset=2>
        <v-btn block color="primary" @click='createArticle'>Создать новую статью</v-btn>
      </v-col>
    </v-row>
    <article-list :articles="myArticles" />
  </v-container>
</template>



<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
const App = namespace('App');

import ArticleList from '../components/ArticleList.vue'

@Component({
  components: { 'article-list': ArticleList },
})
export default class Article extends Vue {
  @App.Getter
  public myArticles!: boolean;

  @App.Action
  private getMyArticles!: () => Promise<any>

  private createArticle() {
    this.$router.push('/new-article')
  }

  private created() {
    document.title = 'Мои статьи' // todo: не получать статьи, если они сохранены
    this.getMyArticles()
  }

};
</script>

<style scoped>

</style>
