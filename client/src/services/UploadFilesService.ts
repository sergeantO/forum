import axios from 'axios';

const API_URL = 'http://localhost:4000/api/upload';

class UploadFilesService {
  public upload( file: File, onUploadProgress: (progressEvent: any) => void ) {
    const formData = new FormData()

    formData.append('file', file)

    return axios.post(API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress,
    });
  }
}

export default new UploadFilesService()
