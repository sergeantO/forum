<template>
  <v-container fluid class='pt-0'>
    <v-row>
      <v-col cols='8' offset="2">
        <h1 class="my-7">{{ title }} </h1>
      </v-col>
    </v-row>
    <v-row>
      <v-img
        v-if="image"
        :src='image'
        height="550px"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.9)"
      />
      <v-col v-else cols='8' offset="2">
        <v-divider></v-divider>
      </v-col>
    </v-row>
    
    <v-row>
      <RenderArticle :rawHtml="rawHtml" @newNote="onNewNote" />
      <v-col cols='3'>
        <NewNote 
          v-if="noteData" 
          :noteData='noteData' 
          @closeME="noteData = null" 
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols='8' offset="2">
        <v-divider></v-divider>
        <Comments />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Ref, Vue } from 'vue-property-decorator';
// import { namespace } from 'vuex-class';
// const App = namespace('App');

import { mdiNotePlusOutline } from '@mdi/js';

import ArticleService from '../services/ArticleService';
import NewNote from '../components/NewNote.vue';
import NoteService from '../services/NoteService';
import Comments from '../components/Comments.vue';
import render from '../services/articleRender/Render'
import RenderArticle from '../components/RenderedArticle.vue'

@Component({
  components: { NewNote, Comments, RenderArticle },
})
export default class Article extends Vue {
  public $route: any; // bugfix

  @Ref()
  private readonly tool!: HTMLElement

  private icons = {
    plus: mdiNotePlusOutline,
  }

  private title: string = ''
  private image: string = ''
  private tracker = { x: 0, y: 0 }
  private noteData: any = ''
  private rawHtml: string = ''

  private created() {
    ArticleService.getOne(this.id)
    .then((data) => {
      this.title = data.title
      this.image = data.image
      this.rawHtml = render.parser(data.editorData).join('')
    })
  }

  private onNewNote(noteData: any) {
    this.noteData = {
      ...noteData,
      articleId: this.id,
      articleName: this.title,
    }
  }

  private get id() {
    return this.$route.params.id
  }

}
</script>

<style scoped>


</style>
