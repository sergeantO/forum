<template>
  <v-container fluid >
    <v-row v-if="this.user">
      <v-col>
        <h3>
          <strong>{{ user.username }}</strong> Profile
        </h3>
      </v-col>
    </v-row>
    <v-row v-if="this.user">
      <v-col cols="4">
        <v-img
          max-height="220"
          :src="user.image"
        ></v-img>
      </v-col>
      <v-col cols="8">
        <p>
          <strong>Id:</strong>
          {{ user.id }}
        </p>
        <p>
          <strong>Created At:</strong>
          {{ new Date(user.createdAt).toLocaleDateString()  }}
        </p>
        <p>
          <strong>Inviter:</strong>
          {{ user.inviter || 'GOD' }}
        </p>
        <p>
          <strong>Email:</strong>
          {{ user.email }}
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class UserInfo extends Vue {
  @Prop() private user: any;
}
</script>