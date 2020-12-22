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
        Читать
      </v-btn>
      
      <v-spacer></v-spacer>

      <v-btn 
        v-if="article.marked"
        fab
        small
        text
        color="primary"
        @click="unbookmark"
      >
        <v-icon>{{ icons.mdiBookmark }}</v-icon>
      </v-btn>

      <v-btn 
        v-else
        fab
        small
        text
        color="primary"
        @click="bookmark"
      >
        <v-icon>{{ icons.mdiBookmarkOutline }}</v-icon>
      </v-btn>

      <v-btn 
        v-if="article.publish === false"
        fab
        small
        text
        color="primary"
        @click="edit"
      >
        <v-icon>{{ icons.mdiPen }}</v-icon>
      </v-btn>

      <v-btn text>
        <v-icon>{{ icons.mdiEye }}</v-icon>
        <span class="ml-2">{{ article.views }}</span>
      </v-btn>

    </v-card-actions>
  </v-card>
</template>

<script lang='ts'>
import { mdiEye, mdiPen, mdiBookmark, mdiBookmarkOutline } from '@mdi/js';

import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
const App = namespace('App');

import ArticleService from '../services/ArticleService';

@Component
export default class ArticlePrewiev extends Vue {
  @Prop()
  public article!: any

  @App.Mutation
  private setTags!: (tags: string[]) => void

  @App.Mutation
  private setBookmarkStatus!: (data: {articleId: string, status: boolean}) => void

  private icons = {
    mdiEye,
    mdiPen,
    mdiBookmark,
    mdiBookmarkOutline,
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

  private edit() {
    // todo
  }

};
</script>

<style scoped>

</style>
