<template>
  <v-col 
      cols='6' 
      offset="2"  
      @mousedown='getPoint' 
      @mouseup='mouseup'>
    <div id="article" class="article" v-html="rawHtml"></div>
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
    const selectedText = this.getSelected().text

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

  private getSelected(): { text: string, hash: string } {
    let selection: Selection | null = null
    if (window.getSelection) {
      selection = window.getSelection()
    } else if (document.getSelection) {
      selection = document.getSelection()
    }

    if (selection === null) {
      return { text: '', hash: '' }
    }
    if (selection.anchorNode === null) {
      return { text: '', hash: '' }
    }

    let elem = selection.anchorNode as Element
    while (elem.id === undefined || elem.id === '') {
      elem = elem.parentElement as Element
    }
    const id = (elem.id !== 'article') ? elem.id : ''
    const selected = {
      text: selection.toString(),
      hash: id,
    }

    return selected
  }


  private add() {
    const top = Number.parseInt(this.tool.style.top, 10) - 90
    const selected = this.getSelected()
    const noteData = {
      text: selected.text,
      hash: selected.hash,
      top: (top > 0) ? top : 0,
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

.article > img {
  max-width: 100% !important;
}

</style>
