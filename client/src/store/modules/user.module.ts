import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import AuthService from '@/services/AuthService';

const storedUser = localStorage.getItem('user');

@Module({ namespaced: true })
class User extends VuexModule {
  public status = storedUser ? { loggedIn: true } : { loggedIn: false };
  public user = storedUser ? JSON.parse(storedUser) : null;

  @Mutation
  public loginSuccess(user: any): void {
    this.status.loggedIn = true;
    this.user = user;
  }

  @Mutation
  public loginFailure(): void {
    this.status.loggedIn = false;
    this.user = null;
  }

  @Mutation
  public logout(): void {
    this.status.loggedIn = false;
    this.user = null;
  }

  @Mutation
  public registerSuccess(): void {
    this.status.loggedIn = false;
  }

  @Mutation
  public registerFailure(): void {
    this.status.loggedIn = false;
  }

  @Action({ rawError: true })
  public login(data: { email: string, password: string }): Promise<any> {
    return AuthService.login(data.email, data.password)
    .then((user) => {
        this.context.commit('loginSuccess', user);
        return Promise.resolve(user);
      })
      .catch((error) => {
        this.context.commit('loginFailure');
        const message =
          (error.response && error.response.data && error.response.data.message) ||
          error.response.data.errors ||
          error.message ||
          error.toString();
        return Promise.reject(message);
      },
    );
  }

  @Action
  public signOut(): void {
    AuthService.logout();
    this.context.commit('logout');
  }

  @Action({ rawError: true })
  public register(data: any): Promise<any> {
    return AuthService.register(data.username, data.email, data.password, data.invite).then(
      (response) => {
        this.context.commit('registerSuccess');
        return Promise.resolve(response.data);
      },
      (error) => {
        this.context.commit('registerFailure');
        const message =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
        return Promise.reject(message);
      },
    );
  }

  get isLoggedIn(): boolean {
    return this.status.loggedIn;
  }
}

export default User;
