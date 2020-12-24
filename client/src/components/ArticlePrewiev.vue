<template>
  <v-card elevation=0 class="ma-2" max-width='48%' style="flex: 1 1 48%;">
    <v-img 
      v-if="article.image"
      :src="article.image"
      class="white--text align-end"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.9)"
      height="200px"
    >
      <v-card-title>{{ article.title.toUpperCase() }}</v-card-title>
    </v-img>

    <v-card-title v-else>{{ article.title.toUpperCase() }}</v-card-title>

    <v-card-subtitle>
      <a class="mr-3"
        v-for="(tag, index) in article.tags"
        :key="index"
        @click="searchByTag(tag)"
      >#{{ tag }}</a>
    </v-card-subtitle>
    
    <v-card-text v-html="article.subtitle" />

    <v-card-actions>

      <v-btn
        color="primary"
        :to="article.path"
        text 
      >
        <v-icon>{{ icons.read }}</v-icon>
        <span class="ml-2">Читать</span>
      </v-btn>
      
      <v-spacer></v-spacer>

      <user-raiting-btn 
        v-if="article.isLike"
        :isLike="article.isLike"
      />

      <bookmark-btn
        v-if="!article.isMyArticle"
        :marked="article.marked" 
        @unbookmark="unbookmark"
        @bookmark="bookmark"
      />

      <edit-btn 
        v-if="article.isMyArticle && article.publish === false"
        @click="edit"
      />

      <delete-btn 
        v-if="article.isMyArticle"
        @click="del"
      />

      <v-btn text>
        <v-icon>{{ icons.mdiEye }}</v-icon>
        <span class="ml-2">{{ article.views }}</span>
      </v-btn>

    </v-card-actions>
  </v-card>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
const App = namespace('App');

import { mdiEye, mdiBookOpenPageVariant   } from '@mdi/js';

import ArticleService from '../services/ArticleService';

import BookmarkBtn from './articleActions/BookmarkBtn.vue'
import DeleteBtn from './articleActions/DeleteBtn.vue'
import EditBtn from './articleActions/EditBtn.vue'
import UserArticleRaiting from './articleActions/UserArticleRaiting.vue'

@Component({
  components: {
    'bookmark-btn': BookmarkBtn,
    'delete-btn': DeleteBtn,
    'edit-btn': EditBtn,
    'user-raiting-btn': UserArticleRaiting,
  },
})
export default class ArticlePrewiev extends Vue {
  @Prop()
  public article!: any

  @App.Mutation
  private setTags!: (tags: string[]) => void

  @App.Mutation
  private setBookmarkStatus!: (data: {articleId: string, status: boolean}) => void

  private icons = {
    mdiEye,
    read: mdiBookOpenPageVariant,
  }

  private searchByTag(tag: string) {
    this.setTags([tag])
  }

  private bookmark() {
    ArticleService.bookmark(this.article.id)
      .then((id) => {
        this.setBookmarkStatus({articleId: this.article.id, status: true})
      })
  }

  private unbookmark() {
    ArticleService.unbookmark(this.article.id)
      .then((id) => {
        this.setBookmarkStatus({articleId: this.article.id, status: false})
      })
  }

  private del() {
    ArticleService.remove(this.article.id)
      .then((data) => {
        console.log(data)
      })
  }

  private edit() {
    this.$router.push(`/article/edit/${this.article.id}`)
  }

};
</script>

<style scoped>

</style>
