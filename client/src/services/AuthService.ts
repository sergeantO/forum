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
    return axios.get(API_URL + 'newInvite', { headers: authHeader() })
    .then((response) => {
      return response.data.invitation
    })
  }

  public info(userId: string) {
    return axios.get(API_URL + userId, { headers: authHeader() })
    .then((response) => {
      return response.data
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

  public checkUsername(username: string) {
    return axios
      .get(API_URL + 'checkusername/' + username)
      .then((response) => {
        if (response.status === 200) {
          return response.data
        }
        throw Error()
      })
  }

  public checkemail(email: string) {
    return axios
      .get(API_URL + 'checkemail/' + email)
      .then((response) => {
        if (response.status === 200) {
          return response.data
        }
        throw Error()
      })
  }
}

export default new AuthService();
