import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:4000/notes/';

class NoteService {
  public getArticleNotes(ArticleId: string) {
    return axios.get(API_URL + ArticleId, { headers: authHeader() })
  }

  public getMyNotes() {
    return axios.get(API_URL, { headers: authHeader() })
  }

  // todo: типизировать данные
  public create(data: any) {
    return axios.post(API_URL, data, { headers: authHeader() });
  }
}

export default new NoteService();
