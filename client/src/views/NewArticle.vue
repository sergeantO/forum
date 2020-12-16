<template>
  <v-container>
    <v-text-field label="Название статьи" v-model="title"></v-text-field>
    <v-combobox
      v-model="tags"
      clearable
      hide-selected
      multiple
      chips
      label="Теги"
      hide-details
    ></v-combobox>
    <UploadImage @uploaded='setFileName' />
    <Editor ref="editor"/>
    <v-btn @click="save" color="primary">Save</v-btn>
  </v-container>
</template>

<script lang="ts">
import { Component, Ref, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
const App = namespace('App');

import Editor from '../components/Editor.vue'
import { OutputData } from '@editorjs/editorjs/types/data-formats';
import ArticleService from '../services/ArticleService'
import UploadImage from '../components/UploadImage.vue'

@Component({
  components: {
    Editor,
    UploadImage,
  },
})
export default class NewArticle extends Vue {
  public $router: any

  private title = ''
  private imageFileName = ''
  private tags: string[] = []

  @Ref()
  private readonly editor!: Editor

  private setFileName(filename: string) {
    this.imageFileName = filename
  }

  private save() {
    this.editor.save()
      .then((doc) => {
        const data = {
          ...doc,
          title: this.title,
          image: this.imageFileName,
          tags: this.tags,
        }
        ArticleService.create(data).then((response) => {
          if (response.status === 201) {
            this.$router.push('/')
          }
        }).catch((err) => {
          // console.error(err) // todo вывести плашку
        })
      })
  }
}
</script>

<style scoped>
#editorjs {
  margin-bottom: 15px;
}
</style>