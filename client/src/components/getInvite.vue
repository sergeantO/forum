<template>
  <v-row>
    <v-col cols="3">
      <v-btn block @click="generateInvite">
        Сгенерировать
      </v-btn>
    </v-col>
    <v-col cols="7">
      <v-text-field
        :label='helper'
        hide-details
        v-model="inviteToken"
        id="myInput"
        @click="myFunction"
        disabled
      ></v-text-field>
    </v-col>
    <v-col cols="2">
       <v-btn block @click="myFunction">
        Скопировать
      </v-btn>
    </v-col>
  </v-row>

</template>

<script lang='ts'>
import { Component, Ref, Vue } from 'vue-property-decorator';
import AuthService from '../services/AuthService'
import { mdiClose } from '@mdi/js';


@Component
export default class GetInvite extends Vue {
  private inviteToken = ''
  private helper = 'Сгенерируйте приглашение'

  private icons = {
    close: mdiClose,
  }

  private generateInvite() {
    AuthService.newInvite().then( (data) => {
      this.inviteToken = `http://localhost:8080/invite/${data}`
      this.helper = 'Скопируйте приглашение и отправьте'
    })
  }

  private myFunction() {
    const range = document.createRange()
    range.selectNode(document.getElementById('myInput') as Node)
    window!.getSelection()!.removeAllRanges() // clear current selection
    window!.getSelection()!.addRange(range) // to select text
    document.execCommand('copy')
    window!.getSelection()!.removeAllRanges() // to deselect
  }
}
</script>