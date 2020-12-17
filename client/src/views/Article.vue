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
    </v-row>
    
    <v-row>
      <v-col cols='6' offset="2"  @mousedown='getPoint' @mouseup='mouseup'>
        <Editor v-if="editorData" :readMode="true" :initData="editorData" />
      </v-col>
      <v-col cols='3'>
        <NewNote 
          v-if="noteData" 
          :noteData='noteData' 
          @closeME="noteData = null" 
        />
      </v-col>
    </v-row>
    <div class="tools" ref='tool'>
      <v-btn @click='add'>+</v-btn>
    </div>
  </v-container>
</template>

<script lang="ts">
import { Component, Ref, Vue } from 'vue-property-decorator';
// import { namespace } from 'vuex-class';
// const App = namespace('App');

import Editor from '../components/Editor.vue'
import ArticleService from '../services/ArticleService';
import NewNote from '../components/NewNote.vue';

@Component({
  components: { Editor, NewNote },
})
export default class Article extends Vue {
  public $route: any; // bugfix

  @Ref()
  private readonly tool!: HTMLElement

  private editorData: object | null = null
  private title: string = ''
  private image: string = 'https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg'
  private tracker = { x: 0, y: 0 }
  private noteData: any = ''

  private created() {
    ArticleService.getOne(this.id)
    .then((data) => {
      this.editorData = data.editorData
      this.title = data.title
      this.image = data.image || 'https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg'
    })
  }


  private getPoint(e: MouseEvent) {
    this.tracker.x = e.pageX
    this.tracker.y = e.pageY
  }

  private mouseup(e: MouseEvent) {
      const selectedText = this.getSelected()

      if (e.pageY <= this.tracker.y) {
        this.tracker.y = e.pageY
        this.tracker.x = e.pageX
      }

      if (selectedText) {
        const left = this.tracker.x + 5
        const top = this.tracker.y - 160
        this.showBtn(left, top)
      } else {
        this.hideBtn()
      }
  }

  private showBtn(left: number, top: number) {
    if (!this.tool) { return }

    const style = this.tool.style
    style.display = 'block'
    style.top = top + 'px'
    style.left = left + 'px'
  }

  private hideBtn() {
    if (!this.tool) { return }

    const style = this.tool.style
    style.display = 'none'
  }

  private getSelected(): string {
      let t = null
      if (window.getSelection) {
        t = window.getSelection()
      } else if (document.getSelection) {
        t = document.getSelection()
      }
      return t!.toString()
  }

  private add() {
    const top = Number.parseInt(this.tool.style.top, 10) - 700
    const noteData = {
      text: this.getSelected(),
      link: `http://localhost:8080/article/${this.id}`,
      top: (top > 0) ? top : 0,
    }
    this.noteData = noteData
    this.hideBtn()
  }

  private get id() {
    return this.$route.params.id
  }

}
</script>

<style scoped>
.tools {
  display: none;
  position: absolute;
  background: #777;
  z-index: 1;
}

</style>
