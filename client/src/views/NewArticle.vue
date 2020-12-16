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
    <v-file-input
      v-model="image"
      chips
      show-size
      truncate-length="20"
      label="Image"
      accept="image/png, image/jpeg, image/bmp"
      :prepend-icon="icons.mdiCameraAccount"
    ></v-file-input>
    <Editor ref="editor"/>
    <ArticlePrewiev 
      v-if="IsReadyPreview"
      :article="prewiev"
    />
    <v-btn @click="save" color="primary">Save</v-btn>
  </v-container>
</template>

<script lang="ts">
import { Component, Ref, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
const App = namespace('App');

import ArticlePrewiev from '../components/ArticlePrewiev.vue'
import Editor from '../components/Editor.vue'
import { OutputData } from '@editorjs/editorjs/types/data-formats';
import ArticleService from '../services/ArticleService'

import {
  mdiCameraAccount,
} from '@mdi/js'

@Component({
  components: {
    Editor,
    ArticlePrewiev,
  },
})
export default class NewArticle extends Vue {
  public $router: any

  private icons = {
    mdiCameraAccount,
  }
  private title = ''
  private image = null
  private tags = ['Vuetify', 'Programming']
  private prewiev: any = {}

  @Ref()
  private readonly editor!: Editor

  get IsReadyPreview(): boolean {
    return this.prewiev !== undefined &&
      this.prewiev.title !== undefined &&
      this.prewiev.sublile !== undefined &&
      this.prewiev.tags !== undefined
  }

  private save() {
    this.editor.save()
      .then((doc) => {
        const data = {
          ...doc,
          title: this.title,
          src: this.image,
          tags: this.tags,
          // subtitle: (<OutputData>doc).blocks.find(b => b.type === 'paragraph')!.data.text as string
        }
        // this.prewiev = data
        // console.log(data)
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
  border-left: 1px solid rgba(0,0,0,.2);
  margin-bottom: 15px;
}
</style>