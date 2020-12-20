<template>
  <v-card outlined>
    <v-img 
      v-if="article.image"
      :src="article.image"
      class="white--text align-end"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.9)"
      height="150px"
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
    
    <v-card-text>{{ article.subtitle }}</v-card-text>

    <v-divider class="mx-4"></v-divider>
    
    <v-card-actions>

      <v-btn
        color="deep-purple lighten-2"
        :to="article.path"
        text 
      >
        Читать
      </v-btn>
      
      <v-spacer></v-spacer>

      <v-chip
        v-if="article.publish === true"
        class="ma-2"
        color="primary"
        text-color="white"
        close
        @click:close="unpublish"
      >
        Опубликованно
      </v-chip>
      <v-btn text>
        <v-icon>{{ icons.mdiEye }}</v-icon>
        <span class="ml-2">{{ article.views }}</span>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang='ts'>
import { mdiEye } from '@mdi/js';

import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
const App = namespace('App');

@Component
export default class ArticlePrewiev extends Vue {
  @Prop()
  public article!: object

  @App.Mutation
  private setTags!: (tags: string[]) => void

  private icons = {
    mdiEye,
  }

  private searchByTag(tag: string) {
    this.setTags([tag])
  }

  private unpublish() {

  }

};
</script>

<style scoped>

</style>
