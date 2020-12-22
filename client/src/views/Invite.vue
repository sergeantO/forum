<template>
  <v-container fluid bg fill-height>
    <v-row>
      <v-col cols=8 offset=2>
        <h1>Добро пожаловать!</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols=6 offset=1>
        <h2>Правила</h2>
        <p>У нас запрещено: </p>
        <ul>
          <li>Пытаться любым доступным способом нарушить работу системы оценивания. Например:
            <ul>
              <li>Lеанонимизировать автора статьи, как на этом ресурсе, так и на сторонних;</li>
              <li>Eстраивать "набеги" с целью резко повысить или понизить рейтинг какой-либо статьи;</li>
              <li>Cоздавать себе второй аккаунт;</li>
              <li>и т.д.</li>
            </ul>
          </li>
          <li>Пытаться в грубой форме нарушать законодательство (например, призывами к насилию)</li>
        </ul>
        <br />
        <p><b>Все что не запрещено, разрешено! Мы любим свободу слова</b></p>
        <p>Любая дальнейшая модерация ресурса осуществляется сообществом, а не администрацией</p>
        <p>Администрация не несет ответственности за контент, который производит сообщество. Мнение администрации может отличаться от мнения автора любой статьи</p>
      </v-col>
      <v-col cols=4>
        <v-card class="pa-5">
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              v-model.lazy="user.username"
              :counter="15"
              :rules="nameRules"
              label="Name"
              required
              error-count="2"
              :error-messages="validErrors.username"
              @blur="onUsernameChange"
            ></v-text-field>

            <v-text-field
              v-model.lazy="user.email"
              :rules="emailRules"
              label="E-mail"
              error-count="2"
              :error-messages="validErrors.email"
              required
              @blur="onEmailChange"
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
              block
              :disabled="!valid"
              color="primary"
              @click="handleRegistration"
            >
              <v-progress-circular
                v-if="loading"
                indeterminate
                color="white"
              ></v-progress-circular>
              <span v-else>Регистрация</span>
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
      
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
const Auth = namespace('User');

import AuthService from '../services/AuthService';

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

  private validErrors = {
    username: [] as string[],
    email: [] as string[],
  }

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

  private onUsernameChange() {
    if (this.user.username === '') {
      this.validErrors.username = []
      return
    }

    AuthService.checkUsername(this.user.username)
      .then((valid: boolean) => {
        this.validErrors.username = valid ? [] : ['Данное имя уже используется']
      })
      .catch((e) => {
        this.validErrors.username = []
      })
  }

  private onEmailChange() {
    if (this.user.email === '') {
      this.validErrors.email = []
      return
    }

    AuthService.checkemail(this.user.email)
      .then((valid: boolean) => {
        this.validErrors.email = valid ? [] : ['Данный E-mail уже используется']
      })
      .catch((e) => {
        this.validErrors.email = []
      })
  }

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
