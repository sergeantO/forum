<template>
  <v-snackbar
    v-model="snackbar"
    :multi-line="true"
    right
    bottom
  >
    {{ text }}

    <template v-slot:action="{ attrs }">
      <v-btn
        color="red"
        text
        v-bind="attrs"
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
import { Component, Prop, Ref, Vue, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
const AppState = namespace('App');

@Component
export default class Notification extends Vue {
  @AppState.Getter
  private error!: string

  private snackbar = false
  private text = ''

  @Watch('error')
  private onError(val: string, oldval: string) {
    this.snackbar = !!val
    this.text = val
  }

  @Watch('snackbar')
  private onCloseError(val: boolean, oldval: boolean) {
    if (val === false) {
      this.$emit('closed')
    }
  }

}
</script>
