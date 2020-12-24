<template>
  <v-container fluid v-if="isError">
    <v-row>
      <v-col cols='8' offset="2">
        <h1 class="my-7">Статья не существует или была удалена автором</h1>
      </v-col>
    </v-row>
  </v-container>
  <v-container fluid v-else>
    
    <v-row>
      <v-col cols='8' offset="2">
        <h1 class="my-7">{{ title }} </h1>
      </v-col>
    </v-row>

    <v-row>
      <v-img
        v-if="image"
        :src="image"
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
      <v-col offset="2">
        <v-btn-toggle v-model="toggle" group>
          <v-btn text @click="onLike">
            <v-icon class="mr-3">{{ icons.like }}</v-icon> 
            <span v-if="isArticleInfoVisable">{{ likes }}</span>
          </v-btn>
          <v-btn text @click="onDislike">
            <v-icon class="mr-3">{{ icons.dislike }}</v-icon>
            <span v-if="isArticleInfoVisable">{{ dislikes }}</span>
          </v-btn>
        </v-btn-toggle>
      </v-col>
      <v-col offset="2">
        <span>Views: {{ views }}</span>
        <br />
        <span v-if="isArticleInfoVisable">KPI: {{ KPI }}</span>
      </v-col>
    </v-row>

    <v-row v-if="isArticleInfoVisable">
      <v-col cols='8' offset="2">
        <v-divider></v-divider>
        <Comments />
      </v-col>
    </v-row>

  </v-container>
</template>

<script lang="ts">
import { Component, Ref, Vue, Watch } from 'vue-property-decorator'

import { mdiNotePlusOutline, mdiThumbUp, mdiThumbDown } from '@mdi/js'

import ArticleService from '../services/ArticleService'
import NewNote from '../components/NewNote.vue'
import NoteService from '../services/NoteService'
import Comments from '../components/Comments.vue'
import render from '../services/articleRender/Render'
import RenderArticle from '../components/RenderedArticle.vue'

@Component({
  components: { NewNote, Comments, RenderArticle },
})
export default class Article extends Vue {
  private icons = {
    plus: mdiNotePlusOutline,
    like: mdiThumbUp,
    dislike: mdiThumbDown,
  }

  private title: string = ''
  private image: string = ''
  private tracker = { x: 0, y: 0 }
  private noteData: any = ''
  private rawHtml: string = ''

  private toggle: any = -1

  private isLike?: any = null
  private likes: number = 0
  private dislikes: number = 0
  private views: number = 0
  private isMyArticle: boolean

  private isError = false

  private mounted() {
    ArticleService.getOne(this.id)
      .then((data) => {
        this.isLike = data.isLike
        this.dislikes = data.dislikes
        this.likes = data.likes
        this.views = data.views
        this.isMyArticle = data.isMyArticle

        this.title = data.title
        this.image = data.image

        const { blocks, version, time } = data
        this.rawHtml = render.parser({ blocks, version, time }).join('')

        document.title = data.title
      })
      .catch(() => {
        this.isError = true
        document.title = 'Стать не существует'
      })
  }

  private get isArticleInfoVisable() {
    return (this.toggle === 1) || (this.toggle === 0) || (this.isMyArticle)
  }

  private onNewNote(noteData: any) {
    this.noteData = {
      ...noteData,
      articleId: this.id,
      articleName: this.title,
    }
  }

  private get KPI() {
    return ( (this.likes - this.dislikes) / this.views ).toFixed(3) || 0
  }

  @Watch('isLike')
  private onIsLikeChange(val: boolean) {
    if (val === true) {
      this.toggle = 0
    } else if (val === false) {
      this.toggle = 1
    } else {
      this.toggle = null
    }
  }

  // todo: вывести оповещение при ошибке
  private onDislike() {
    if (this.toggle === 0 || this.toggle === 1) {
      return
    }

    ArticleService.dislike(this.id)
      .then(() => {
        this.dislikes++
      })
      .catch((e) => {
        this.toggle = -1
      })
  }

  private onLike() {
    if (this.toggle === 0 || this.toggle === 1) {
      return
    }

    ArticleService.like(this.id)
      .then(() => {
        this.likes++
      })
      .catch((e) => {
        this.toggle = -1
      })
  }

  private get id() {
    return this.$route.params.id
  }

}
</script>

<style scoped>
.v-item--active {
  color: blueviolet !important;
}
</style>
