<template>
  <v-col 
      cols='6' 
      offset="2"  
      @mousedown='getPoint' 
      @mouseup='mouseup'>
    <div v-html="rawHtml"></div>
    <div class="tools" ref='tool'>
      <v-btn fab small dark color='primary' @click='add'><v-icon>{{ icons.plus }}</v-icon></v-btn>
    </div>
    </v-col>

</template>

<script lang="ts">
import { Component, Prop, Ref, Vue } from 'vue-property-decorator';
// import { namespace } from 'vuex-class';
// const App = namespace('App');

import { mdiNotePlusOutline } from '@mdi/js';

import NewNote from '../components/NewNote.vue';
import NoteService from '../services/NoteService';
import render from '../services/articleRender/Render'

@Component({
  components: { NewNote },
})
export default class Article extends Vue {
  public $route: any; // bugfix

  @Ref()
  private readonly tool!: HTMLElement

  @Prop() private readonly rawHtml: string = ''

  private icons = {
    plus: mdiNotePlusOutline,
  }

  private pointer = { x: 0, y: 0 }

  private getPoint(e: MouseEvent) {
    this.pointer.x = e.pageX
    this.pointer.y = e.pageY
  }

  private mouseup(e: MouseEvent) {
    const selectedText = this.getSelected()

    if (e.pageY <= this.pointer.y) {
      this.pointer.y = e.pageY
      this.pointer.x = e.pageX
    }

    if (selectedText) {
      const left = this.pointer.x + 5
      const top = this.pointer.y - 160
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
    const top = Number.parseInt(this.tool.style.top, 10) - 80
    const noteData = {
      text: this.getSelected(),
      top: (top > 0) ? top : 0,
      hash: '',
    }

    this.hideBtn()
    this.$emit('newNote', noteData)
  }

}
</script>

<style scoped>
.tools {
  display: none;
  position: absolute;
  z-index: 1;
}

</style>
