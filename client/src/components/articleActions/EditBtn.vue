<template>
  <v-btn 
    fab
    small
    text
    color="primary"
    @click='click'
  >
    <v-icon>{{ icons.edit }}</v-icon>
  </v-btn>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mdiPencilOutline } from '@mdi/js';

@Component
export default class EditBtn extends Vue {
  private icons = {
    edit: mdiPencilOutline,
  }

  private click() {
    this.$emit('click')
  }
}
</script>