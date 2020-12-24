import API from './API';
import authHeader from './auth-header';

const API_URL = 'http://localhost:4000/api/notes/';

class NoteService {
  public getArticleNotes(ArticleId: string) {
    return API.get(API_URL + ArticleId, { headers: authHeader() })
      .then((response) => {
        return Promise.resolve(response.data);
      })
  }

  public getMyNotes() {
    return API.get(API_URL + 'my', { headers: authHeader() })
      .then((response) => {
        return Promise.resolve(response.data);
      })
  }

  public create(noteData: {
    text: string, comment?: string,
    hash?: string, articleId: string, articleName: string,
    save: boolean, publish: boolean,
  }) {
    return API.post(API_URL, noteData, { headers: authHeader() })
      .then((response) => {
        return Promise.resolve(response.data);
      })
      .catch((error) => {
        if (error.response) {
          const data = error.response.data
          const status = error.response.status
          const headers = error.response.headers
          return Promise.reject({ data, status, headers })
        }
      })
  }
}

export default new NoteService();
