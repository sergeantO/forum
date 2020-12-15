<template>
  <h1>article {{ id }} </h1>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
const Auth = namespace('User');

@Component
export default class Article extends Vue {
  public $route: any; // bugfix

  private get id() {
    return this.$route.params.id
  }

}
</script>
