<template>
  <div id="editorjs"></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import EditorJS from '@editorjs/editorjs'; 
import Header from '@editorjs/header'; 
import List from '@editorjs/list'; 
import { OutputData } from '@editorjs/editorjs/types/data-formats';

@Component
export default class Editor extends Vue {
  private editor!: EditorJS;

  public mounted () {
    this.editor = new EditorJS({ 
      holder: 'editorjs', 
      placeholder: 'Let`s write an awesome story!',
      tools: { 
        header: Header, 
        list: List 
      }, 
    })
  }

  async save(): Promise<OutputData> {
    let data: OutputData = await this.editor.save().then((outputData) => {
      return outputData
    }).catch((error) => {
      return { blocks: [] }
      console.log('Saving failed: ', error)
    });

    return data
  }
}
</script>

<style  scoped>
#editorjs {
  border-left: 1px solid rgba(0,0,0,.2);
  margin-bottom: 15px;
}
</style>>

