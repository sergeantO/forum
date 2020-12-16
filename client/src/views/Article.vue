<template>
  <v-container fluid class='pt-0'>
    <v-row>
      <v-col cols='8' offset="2">
        <h1 class="my-7">article {{ id }} </h1>
      </v-col>
    </v-row>
    <v-row>
      <v-img
        height="550px"
        src="https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.9)"
      />
    </v-row>
    
    <v-row>
      <v-col cols='6' offset="2">
        <Editor :readMode="true" />
      </v-col>
    </v-row>
  </v-container>
  
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
const Auth = namespace('User');

import Editor from '../components/Editor.vue'

@Component({
  components: { Editor },
})
export default class Article extends Vue {
  public $route: any; // bugfix

  private get id() {
    return this.$route.params.id
  }

}
</script>
