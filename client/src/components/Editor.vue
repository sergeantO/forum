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
  @Prop() private readonly readMode!: boolean

  @Prop() private readonly initData!: OutputData

  private editor!: EditorJS

  public mounted() {
    const config: { [key: string]: any } = {
      holder: 'editorjs',
      tools: {
        header: Header,
        list: List,
      },
    }

    if (this.initData) {
      config.data = this.initData
    }

    if (this.readMode) {
      config.readOnly = this.readMode
    } else {
      config.placeholder = 'Let`s write an awesome story!'
    }

    this.editor = new EditorJS(config)
  }

  public async save(): Promise<OutputData> {
    const data: OutputData = await this.editor.save()
      .then((outputData) => {
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

