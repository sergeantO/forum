import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:4000/article/';

class ArticleService {
  public getList() {
    return axios.get(API_URL, { headers: authHeader() });
  }

  public getOne(id: string) {
    return axios.get(API_URL + id, { headers: authHeader() })
      .then((response) => {
        const { blocks, version, time, title } = response.data
        const editorData = { blocks, version, time }
        return { editorData, title }
      });
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
