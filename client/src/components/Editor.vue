<template>
  <div id="editorjs"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import EditorJS from '@editorjs/editorjs'
// @ts-ignore
import Header from '@editorjs/header'
// @ts-ignore
import List from '@editorjs/list'
import { OutputData } from '@editorjs/editorjs/types/data-formats'

@Component
export default class Editor extends Vue {
  // @ts-ignore
  @Prop({ default: false }) private readonly readMode: boolean

  @Prop()
  private readonly initData: OutputData = { blocks: [] }

  private editor!: EditorJS

  public mounted() {
    this.editor = new EditorJS({
      holder: 'editorjs',
      placeholder: (this.readMode) ? '' : 'Let`s write an awesome story!',
      readOnly: this.readMode,
      tools: {
        header: Header,
        list: List,
      },
      data: this.initData,
    })
  }

  public async save(): Promise<OutputData> {
    const data: OutputData = await this.editor.save().then((outputData) => {
      return outputData
    }).catch((error) => {
      return { blocks: [] }
      // toDo вывести ошибку console.log('Saving failed: ', error)
    });

    return data
  }
}
</script>

<style  scoped>

</style>>

