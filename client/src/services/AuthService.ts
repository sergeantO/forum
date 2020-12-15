import axios from 'axios';

const API_URL = 'http://localhost:4000/user/';

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

  public register(username: string, email: string, password: string) {
    return axios.post(API_URL + 'signup', {
      username,
      email,
      password,
    });
  }
}

export default new AuthService();
