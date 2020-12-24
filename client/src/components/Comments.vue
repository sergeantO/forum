<template>

  <v-expansion-panels flat>
    <v-expansion-panel>
      <v-expansion-panel-header @click="openComments">
        Коментарии
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-card v-for="(note, id) in notes" :key='id' class="my-3">
          <v-card-subtitle> {{ note.comment }}  </v-card-subtitle>
          <v-card-subtitle> 
            <p class="quote">{{ note.text }}</p>
          </v-card-subtitle>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NoteService from '../services/NoteService';

@Component
export default class Comments extends Vue {
  private notes = []

  private openComments() {
    NoteService.getArticleNotes(this.id)
      .then((data) => {
        this.notes = data
      })
  }

  private get id() {
    return this.$route.params.id
  }

}
</script>

<style scoped>
.quote {
  border-left: 2px solid blueviolet;
  padding-left: 5px;
}

</style>
