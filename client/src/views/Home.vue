<template>
  <v-container fluid>
    <article-list :articles="articles" />
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
export default class Home extends Vue {
  @App.Getter
  public articles!: boolean;

  @App.Action
  private getArticles!: () => Promise<any>

  private created() {
    document.title = 'Home'
    this.getArticles()
  }

};
</script>

<style scoped>

</style>
