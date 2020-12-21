<template>
  <v-row class="d-flex flex-wrap align-content-start justify-space-around align-start" >
     <article-prewiev
        v-for="article in articles" 
        :key="article.id" 
        :article="article"
      ></article-prewiev>
  </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import ArticlePrewiev from '../components/ArticlePrewiev.vue'

@Component({
  components: { 'article-prewiev': ArticlePrewiev },
})
export default class ArticleList extends Vue {
  @Prop()
  public articles!: boolean;
};
</script>

<style scoped>


</style>
