<template>
  <v-container fluid grid-list-xl>
    <v-switch
      v-model="switch1"
      :label="`Расположение меню: ${switch1.toString()}`"
    ></v-switch>
  </v-container>
  
</template>

<script>
export default {
  data() {
    return {
      switch1: true,
    }
  },
}
</script>