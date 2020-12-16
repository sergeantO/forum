<template>
  <v-container fluid class='pt-0'>
    <v-row>
      <v-col cols='8' offset="2">
        <h1 class="my-7">{{ title }} </h1>
      </v-col>
    </v-row>
    <v-row>
      <v-img
        v-if="image"
        :src='image'
        height="550px"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.9)"
      />
    </v-row>
    
    <v-row>
      <v-col cols='6' offset="2">
        <Editor v-if="editorData" :readMode="true" :initData="editorData" />
      </v-col>
    </v-row>
  </v-container>
  
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// import { namespace } from 'vuex-class';
// const App = namespace('App');

import Editor from '../components/Editor.vue'
import ArticleService from '../services/ArticleService';


@Component({
  components: { Editor },
})
export default class Article extends Vue {
  public $route: any; // bugfix

  private editorData: object | null = null
  private title: string = ''
  private image!: string

  private created() {
    ArticleService.getOne(this.id).then((data) => {
      this.editorData = data.editorData
      this.title = data.title
      this.image = data.image || 'https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg'
    })
  }

  private get id() {
    return this.$route.params.id
  }

}
</script>
