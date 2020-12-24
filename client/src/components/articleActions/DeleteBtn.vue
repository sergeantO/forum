<template>
  <v-btn 
    fab
    small
    text
    color="primary"
    @click='click'
  >
    <v-icon>{{ icons.delete }}</v-icon>
  </v-btn>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mdiDeleteOutline } from '@mdi/js';

@Component
export default class DeleteBtn extends Vue {
  private icons = {
    delete: mdiDeleteOutline,
  }

  private click() {
    this.$emit('click')
  }
}
</script>