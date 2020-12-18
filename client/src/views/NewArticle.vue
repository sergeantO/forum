<template>
  <v-container mt-10>
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
    <v-row justify="center" align="center"> 
      <v-col cols='2'>
        <v-btn block @click="save" color="primary">Сохранить</v-btn>
      </v-col>
      <v-col>
        <v-checkbox v-model="publish" label="Опубликовать"></v-checkbox>
      </v-col>
    </v-row>
    
    
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

  private publish = false

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
          publish: this.publish,
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