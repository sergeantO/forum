<template>
  <v-card class='pa-2 note'>
    <v-card-title class="headline">
      Новая заметка
    </v-card-title>

    <v-card-subtitle> <p> {{ textToRender }} </p>  </v-card-subtitle>
    <v-textarea
      outlined
      label="Комментарий"
      v-model="comment"
      rows="3"
      :rules="rules"
      counter='200'
      auto-grow
    ></v-textarea>
    <v-card-actions>
      <v-checkbox v-model="save" label="Сохранить"></v-checkbox>
      <v-spacer></v-spacer>
      <v-checkbox v-model="publish" label="Опубликовать"></v-checkbox>
    </v-card-actions>
    <v-card-actions>
      <v-btn 
        :disabled="(!save && !publish)" 
        block 
        color='primary' 
        @click="done"
      >
        Сохранить
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Ref, Vue, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
const App = namespace('App');

import NoteService from '../services/NoteService'

@Component
export default class NewNote extends Vue {
  @Prop() private readonly noteData!: { text: string; articleId: string; top: number; hash?: string }
  private comment = ''
  private save = false
  private publish = false

  private rules = [(v: string) => v.length <= 200 || 'Max 200 characters']

  public mounted() {
    (this.$el as HTMLElement).style.top = this.noteData.top + 'px'
  }

  @Watch('noteData')
  private onNoteDataChanged(val: string[], oldVal: string[]) {
    (this.$el as HTMLElement).style.top = this.noteData.top + 'px'
  }

  @App.Mutation
  private errorPush!: (errors: string[]) => void

  private done() {
    NoteService.create({
      text: this.noteData.text,
      articleId: this.noteData.articleId,
      comment: this.comment,
      hash: this.noteData.hash,
      save: this.save,
      publish: this.publish,
    }).then((resporse) => {
      console.log(resporse)
      this.closeSelf()
    }).catch((err) => {
      this.errorPush(err.data.errors)
    })
  }

  private closeSelf() {
    this.$emit('closeME')
  }

  private get textToRender() {
    const words = this.noteData.text.split(' ')
    if (words.length < 35) {
      return this.noteData.text
    }

    const head = words.slice(0, 15).join(' ')
    const tail = words.slice(words.length - 15, words.length).join(' ')
    return head + ' <...> ' + tail
  }


}
</script>

<style scoped>
.note {
  z-index: 2;
}
.v-card__subtitle > p {
  border-left: 2px solid #6200ea;
  margin: 0;
  padding-left: 5px;
  font-style: italic;
}
</style>