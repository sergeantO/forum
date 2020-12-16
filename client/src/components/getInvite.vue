<template>
  <v-row>
    <v-col cols="3">
      <v-btn block @click="generateInvite">
        Сгенерировать
      </v-btn>
    </v-col>
    <v-col cols="9">
      <v-text-field
        :label='helper'
        hide-details
        disabled
        v-model="inviteToken"
      ></v-text-field>
    </v-col>
  </v-row>

</template>

<script lang='ts'>
import { Component, Ref, Vue } from 'vue-property-decorator';
import AuthService from '../services/AuthService'

@Component
export default class GetInvite extends Vue {
  private inviteToken = ''
  private helper = 'Сгенерируйте приглашение'

  private generateInvite() {
    AuthService.newInvite().then( (data) => {
      this.inviteToken = `http://localhost:8080/invite/${data}`
      this.helper = 'Скопируйте приглашение и отправьте'
    })
  }
}
</script>