<template>
  <v-card class='pa-2 note'>
    <v-card-title class="headline">
      Новая заметка
    </v-card-title>

    <v-card-subtitle> <p> {{ textToRender }} </p>  </v-card-subtitle>
    <v-textarea
      outlined
      label="Комментарий"
      :value="comment"
      rows="3"
      :rules="rules"
      counter='200'
      auto-grow
    ></v-textarea>
    <v-card-actions>
      <v-btn @click="save">Сохранить</v-btn>
      <v-btn @click="publish">Отправить</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Ref, Vue, Watch } from 'vue-property-decorator';

@Component
export default class NewNote extends Vue {
  @Prop() private readonly noteData!: { text: string; link: string; top: number; }
  private comment = ''

  private rules = [(v: string) => v.length <= 200 || 'Max 200 characters']

  public mounted() {
    (this.$el as HTMLElement).style.top = this.noteData.top + 'px'
  }

  @Watch('noteData')
  private onNoteDataChanged(val: string[], oldVal: string[]) {
    (this.$el as HTMLElement).style.top = this.noteData.top + 'px'
  }

  private save() {
    this.closeSelf()
  }

  private publish() {
    this.closeSelf()
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