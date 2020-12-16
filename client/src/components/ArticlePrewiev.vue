<template>
  <v-card outlined>
    <v-img 
      v-if="article.src"
      :src="article.src"
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
const Auth = namespace('User');

@Component
export default class ArticlePrewiev extends Vue {
  @Prop()
  public article!: object

  private icons = {
    mdiEye,
  }

};
</script>

<style scoped>

</style>
