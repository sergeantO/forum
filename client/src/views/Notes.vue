<template>
  <v-container fluid>
    <v-row fluid class="d-flex flex-wrap align-content-start justify-space-between align-center">
      <v-card
        v-for="note in notes"
        :key="note.id"
        class="ma-2"
        style="flex: 1 1 48%;"
      >
        <v-card-title> {{ note.comment }} </v-card-title>
        <v-card-text><p class="quote"> {{ note.text }} </p></v-card-text>
        
        <v-card-actions>
          <v-spacer></v-spacer>
          <p>Из статьи &laquo;<a :href='note.link' class="text-decoration-none">{{ note.articleName || 'no name' }}</a>&raquo;</p>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NoteService from '../services/NoteService';

@Component
export default class Notes extends Vue {
  private str = 'hello'
  private notes = []

  private created() {
    document.title = 'Мои заметки'
  }

  private mounted() {
    NoteService.getMyNotes()
      .then((data) => {
        this.notes = data
      })
  }
}
</script>

<style scoped>
.quote {
  font-style: italic;
  border-left: 3px solid #6200ea;
  padding-left: 10px;
}
</style>