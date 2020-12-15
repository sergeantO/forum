<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <h3>
          <strong>{{ currentUser.username }}</strong> Profile
        </h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <v-img
          max-height="220"
          :src="currentUser.image"
        ></v-img>
      </v-col>
      <v-col cols="8">
        <p>
          <strong>Token:</strong>
          {{ currentUser.accessToken.substring(0, 20) }} ...
          {{ currentUser.accessToken.substr(currentUser.accessToken.length - 20) }}
        </p>
        <p>
          <strong>Id:</strong>
          {{ currentUser.id }}
        </p>
        <p>
          <strong>Created At:</strong>
          {{ new Date(currentUser.createdAt).toLocaleDateString()  }}
        </p>
        <p>
          <strong>Inviter:</strong>
          {{ currentUser.inviter || 'GOD' }}
        </p>
        <p>
          <strong>Email:</strong>
          {{ currentUser.email }}
        </p>
      </v-col>
    </v-row>
    
  </v-container>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
const Auth = namespace('User');

@Component
export default class Profile extends Vue {
  public $router: any; // bugfix

  @Auth.Getter
  private isLoggedIn!: boolean;

  @Auth.State('user')
  private currentUser!: any;

  private mounted() {
    if (!this.isLoggedIn) {
      this.$router.push('/login');
    }
  }
}
</script>