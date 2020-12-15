<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm10 md8>
        <v-form
          ref="form"
          v-model="valid"
        >
          <v-alert
            v-show="errors.length"
            v-for="(error, index) in errors"
            :key="index"
            border="left"
            colored-border
            dense
            type="error"
          >
            {{ error }}
          </v-alert>
          <v-text-field
            v-model="user.email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>

          <v-text-field
            v-model="user.password"
            :counter="10"
            type="password"
            :rules="nameRules"
            label="Password"
            required
          ></v-text-field>

          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="handleLogin"
          >
            Validate
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
export default class Login extends Vue {
  private user: any = { email: '', password: '' }
  private loading: boolean = false
  private errors: string[] = []

  private valid = true

  private nameRules = [
    (v: any) => !!v || 'Name is required',
    (v: any) => v.length <= 10 || 'Name must be less than 10 characters',
  ];

  private emailRules = [
    (v: any) => !!v || 'E-mail is required',
    (v: any) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
  ];

  @Auth.Getter
  private isLoggedIn!: boolean;

  @Auth.Action
  private login!: (data: {email: string, password: string}) => Promise<any>;

  private created() {
    if (this.isLoggedIn) {
      this.$router.push('/profile');
    }
  }

  private handleLogin() {
    this.loading = true;
    const isValid = this.form.validate();
    if (!isValid) {
        this.loading = false;
        return;
    } else {
      if (this.user.email && this.user.password) {
        this.login(this.user)
        .then(
          (data) => {
            this.$router.push('/profile');
          })
        .catch((errors) => {
            this.loading = false;
            this.errors = Array.isArray(errors) ? [...errors] : [errors];
          },
        );
      }
    }
  }

  get form(): Vue & { validate: () => boolean } {
    return this.$refs.form as Vue & { validate: () => boolean };
  }
}
</script>

<style scoped>

</style>
