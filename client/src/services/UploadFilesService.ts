import API from './API';
import authHeader from './auth-header';

const API_URL = 'http://localhost:4000/api/upload';

class UploadFilesService {
  public upload( file: File, onUploadProgress: (progressEvent: any) => void ) {
    const formData = new FormData()

    formData.append('file', file)

    const headers: { [key: string]: any } = authHeader()
    headers['Content-Type'] = 'multipart/form-data'

    return API.post(API_URL, formData, {
      headers,
      onUploadProgress,
    }).then((response) => response.data.file.url)
  }
}

export default new UploadFilesService()
