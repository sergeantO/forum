<template>
  <v-container fluid >
    <user-info v-if="user" :user='user' />
    <v-row v-if="isMyProfile(userId)">
      <v-col>
        <GetInvite />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang='ts'>
import { Component, Vue, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
const Auth = namespace('User');

import GetInvite from '../components/getInvite.vue'
import UserInfo from '../components/UserInfo.vue'
import AuthService from '../services/AuthService'

@Component({
  components: { GetInvite, 'user-info': UserInfo },
})
export default class Profile extends Vue {
  public $router: any; // bugfix

  @Auth.Getter
  private isLoggedIn!: boolean

  private user: any = null

  @Auth.State('user')
  private currentUser!: any

  private created() {
    document.title = 'Мой профиль'

    if (!this.isLoggedIn) {
      this.$router.push('/login');
    }

    this.loadUserData(this.userId)
  }

  private loadUserData(userId: string) {
    if ( this.isMyProfile(userId) ) {
      this.user = this.currentUser
    } else {
      AuthService.info(userId)
      .then((user) => {
        this.user = user
      })
    }
  }

  @Watch('userId')
  private onUserIdChange(userId: string) {
    this.loadUserData(userId)
  }

  private isMyProfile(userId: string) {
    return (userId === '0' || userId === this.currentUser.id)
  }

  private get userId(): string {
    return this.$route.params.userId
  }
}
</script>