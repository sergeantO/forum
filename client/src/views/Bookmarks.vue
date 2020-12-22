<template>
  <v-container fluid>
    <article-list :articles="bookmarks" />
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
  public bookmarks!: boolean;

  @App.Action
  private getBookmarks!: () => Promise<any>

  private created() {
    document.title = 'Мои заметки' // todo: не получать статьи, если они сохранены
    this.getBookmarks()
  }

};
</script>

<style scoped>

</style>
