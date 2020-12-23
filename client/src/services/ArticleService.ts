import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:4000/api/article/';

class ArticleService {
  public getList(tags?: string[]) {
    return axios.get(API_URL, { headers: authHeader(), params: { tags } });
  }

  public getMy() {
    return axios.get(API_URL + 'my', { headers: authHeader() });
  }

  public getOne(id: string) {
    return axios.get(API_URL + id, { headers: authHeader() })
      .then((response) => response.data)
  }

  public bookmark(id: string) {
    return axios.post(API_URL + id + '/bookmark', {}, { headers: authHeader() })
      .then((response) => response.data.id);
  }

  public unbookmark(id: string) {
    return axios.post(API_URL + id + '/unbookmark', {}, { headers: authHeader() })
      .then((response) => response.data.id);
  }

  public getBookmarks() {
    return axios.get(API_URL + '/bookmarks', { headers: authHeader() })
  }

  public like(ArticleId: string) {
    return axios.post(API_URL + ArticleId + '/like', {}, { headers: authHeader() })
      .then( (response) => Promise.resolve(response.data))
  }
  public dislike(ArticleId: string) {
    return axios.post(API_URL + ArticleId + '/dislike', {}, { headers: authHeader() })
      .then( (response) => Promise.resolve(response.data))
  }

  // todo: типизировать данные
  public create(data: any) {
    return axios.post(API_URL, data, { headers: authHeader() });
  }

  public update(id: string, data: any) {
    return axios.patch(`${API_URL}/${id}`, { headers: authHeader(), body: JSON.stringify(data) });
  }

  public remove(id: string) {
    return axios.delete(`${API_URL}/${id}`, { headers: authHeader() });
  }
}

export default new ArticleService();
