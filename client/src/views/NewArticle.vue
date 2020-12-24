<template>
  <v-container mt-10>
    <v-text-field label="Название статьи" v-model="title"></v-text-field>
    <tags-provider
      :key="refreshKey"
      :tags="tags"
      :isSearch = 'false'
      @update:tags="onUpdateTags"
    />
    <UploadImage 
      :key="refreshKey+10"
      @uploaded='setFileName' 
      :image="image" 
    />
    <Editor 
      :key="refreshKey+20" 
      :initData="editorData" 
      ref="editor"
    />
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
import TagsProvider from '../components/TagsProvider.vue'

@Component({
  components: {
    'tags-provider': TagsProvider,
    Editor,
    UploadImage,
  },
})
export default class NewArticle extends Vue {
  public $router: any
  private refreshKey = 0

  private title = ''
  private image = {
    url: '',
  }
  private tags: string[] = []
  private publish = false
  private editorData: OutputData = { blocks: [] }

  @Ref()
  private readonly editor!: Editor

  private get id() {
    return this.$route.params.id
  }

  private setFileName(filename: string) {
    this.image.url = filename
  }

  private mounted() {
    if (this.id === undefined) {
      document.title = 'Новая статья'
    } else {
      ArticleService.getOne(this.id)
        .then((data) => {
          this.image.url = data.image
          this.title = data.title
          this.tags = data.tags
          const { blocks, version, time } = data
          this.editorData = { blocks, version, time }
          document.title = data.title
        })
        .then(() => {
          this.refreshKey++
        })
    }
  }

  private onUpdateTags(val: string[]) {
    if (this.tags !== val) {
      this.tags = val
    }
  }

  private save() {
    this.editor.save()
      .then((doc) => {
        const data = {
          ...doc,
          title: this.title,
          image: this.image.url,
          tags: this.tags,
          publish: this.publish,
        }
        if (this.id === undefined) {
          ArticleService.create(data)
            .then((response) => {
              if (response.status === 201) {
                this.$router.push('/my-articles')
              }
            })
            .catch((err) => {
              // console.error(err) // todo вывести плашку
            })
        } else {
          ArticleService.update(this.id, data)
            .then((response) => {
              if (response.status === 200) {
                  this.$router.push('/my-articles')
                }
              }).catch((err) => {
                // console.error(err) // todo вывести плашку
              })
        }

      })
  }
}
</script>

<style scoped>
#editorjs {
  margin-bottom: 15px;
}
</style>