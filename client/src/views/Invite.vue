<template>
  <v-container bg fill-height grid-list-md text-xs-center>
    <v-layout row wrap align-center>
      <v-flex>
        <v-form
          ref="form"
          v-model="valid"
        >
          <v-text-field
            v-model="user.username"
            :counter="15"
            :rules="nameRules"
            label="Name"
            required
          ></v-text-field>

          <v-text-field
            v-model="user.email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>

          <v-text-field
            v-model="user.password"
            counter
            type="password"
            :rules="passwordRules"
            label="Password"
            required
          ></v-text-field>

          <v-text-field
            v-model="user.rePassword"
            counter
            type="password"
            :rules="[this.passwordConfirmationRule]"
            label="Repeat password"
            required
          ></v-text-field>

          <v-text-field
            v-model="user.invite"
            label="Invite"
            disabled
            required
          ></v-text-field>

          <v-btn
            :disabled="!valid"
            color="success"
            @click="handleRegistration"
          >
            <v-progress-circular
              v-if="loading"
              indeterminate
              color="primary"
            ></v-progress-circular>
            <span v-else>Регистрация</span>
          </v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
const Auth = namespace('User');

@Component
export default class Invite extends Vue {
  public $route: any
  public $router: any

  private user: any = {
    username: '',
    password: '',
    rePassword: '',
    email: '',
    invite: this.$route.params.invite,
  }
  private loading: boolean = false
  private message: string = ''

  private valid = true

  private nameRules = [
    (v: any) => !!v || 'Name is required',
    (v: any) => v.length < 16 || 'Name must be less than 16 characters',
    (v: any) => v.length > 2 || 'Name must be more than 2 characters',
  ]

  private passwordRules = [
    (v: any) => !!v || 'Password is required',
    (v: any) => v.length > 7 || 'Password must be not less than 8 characters',
  ]

  private emailRules = [
    (v: any) => !!v || 'E-mail is required',
    (v: any) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
  ]

  @Auth.Getter
  private isLoggedIn!: boolean;

  @Auth.Action
  private login!: (data: any) => Promise<any>;

  @Auth.Action
  private register!: (data: any) => Promise<any>;

  private created() {
    if (this.isLoggedIn) {
      this.$router.push('/profile');
    }
    document.title = 'Добро пожаловать'
  }

  private handleRegistration() {
    this.loading = true;
    const isValid = this.form.validate()
    if (!isValid) {
        this.loading = false;
        return;
    } else {
      if (this.user.username &&
        this.user.email &&
        this.user.password &&
        this.user.invite
      ) {
          this.register(this.user)
            .then(
              (data) => {
                this.message = 'Пользователь успешно зарегистрирован';
                setTimeout(() => {
                  this.$router.push('/profile');
                }, 3000)
              },
              (error) => {
                this.loading = false;
                this.message = error;
              },
            );
      }
    };
  }

  get form(): Vue & { validate: () => boolean } {
    return this.$refs.form as Vue & { validate: () => boolean }
  }

  get passwordConfirmationRule() {
    return () => (this.user.password === this.user.rePassword) || 'Password must match'
  }
}
</script>
