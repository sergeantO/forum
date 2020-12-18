import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:4000/api/user/';

class AuthService {
  public login(email: string, password: string) {
    return axios
      .post(API_URL + 'login', {
        email,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  public logout() {
    localStorage.removeItem('user');
  }

  public newInvite() {
    return axios.get(API_URL + 'newInvite', { headers: authHeader() }).then((response) => {
      return response.data.invitation
    })
  }

  public register(username: string, email: string, password: string, invite: string) {
    return axios.post(API_URL + 'signup', {
      username,
      email,
      password,
      invite,
    });
  }
}

export default new AuthService();
