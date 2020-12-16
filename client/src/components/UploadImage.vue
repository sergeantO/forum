<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="10">
        <v-file-input
          chips
          show-size
          truncate-length="20"
          label="Image"
          accept="image/png, image/jpeg, image/bmp"
          :prepend-icon="icons.mdiCameraAccount"
          @change="selectFile"
        ></v-file-input>
        <v-progress-linear
          v-if="currentFile"
          v-model="progress"
          color="primary"
          height="20"
          reactive
        >
          <strong>{{ progress }} %</strong>
        </v-progress-linear>
      </v-col>

      <v-col cols="2">
        <v-btn color="primary" dark block small @click="upload">
          Upload
          <v-icon right dark>mdi-cloud-upload</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <v-alert v-if="message" border="left" color="blue-grey" dark>
      {{ message }}
    </v-alert>
  </div>
</template>

<script>
import UploadService from '../services/UploadFilesService';

import {
  mdiCameraAccount,
} from '@mdi/js'


export default {
  data() {
    return {
      currentFile: undefined,
      progress: 0,
      message: '',
      icons: {
        mdiCameraAccount,
      },
    };
  },

  methods: {
    selectFile(file) {
      this.progress = 0;
      this.currentFile = file;
    },

    upload() {
      if (!this.currentFile) {
        this.message = 'Please select a file!';
        return;
      }

      this.message = '';

      UploadService.upload(this.currentFile, (event) => {
        this.progress = Math.round((100 * event.loaded) / event.total);
      })
        .then((response) => {
          this.message = 'Изображение успешно загружено'
          this.$emit('uploaded', response.data.filename)
        })
        .catch(() => {
          this.progress = 0;
          this.message = 'Could not upload the file!';
          this.currentFile = undefined;
        });
    },
  },
}
</script>