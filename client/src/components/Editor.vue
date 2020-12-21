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
// @ts-ignore
import Table from '@editorjs/table'
// @ts-ignore
import ImageTool from '@editorjs/image'
// @ts-ignore
import CodeTool from '@editorjs/code'
// @ts-ignore
import InlineCode from '@editorjs/inline-code'
// @ts-ignore
import Quote from '@editorjs/quote'


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
        table: Table,
        image: {
          class: ImageTool,
          config: {
            field: 'file',
            endpoints: {
              byFile: 'http://localhost:4000/api/upload', // backend file uploader endpoint
              // byUrl: 'http://localhost:8008/fetchUrl', // endpoint that provides uploading by Url
            },
          },
        },
        inlineCode: {
          class: InlineCode,
          shortcut: 'CMD+SHIFT+M',
        },
        code: CodeTool,
        quote: Quote,
      },
      minHeight: 20,
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

