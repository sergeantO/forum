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
          <v-icon right dark>{{icons.mdiCloudUploadOutline}}</v-icon>
          <span class="ml-2">Upload</span>
        </v-btn>
      </v-col>
    </v-row>

    <v-img
      v-if="image.url"
      :aspect-ratio="16/9"
      height="150px"
      :src="image.url"
    ></v-img>

  </div>
</template>

<script lang='ts'>
import { Component, Prop, Ref, Vue } from 'vue-property-decorator';
import UploadService from '../services/UploadFilesService';

import {
  mdiCameraAccount,
  mdiCloudUploadOutline,
} from '@mdi/js'

@Component
export default class UploadImage extends Vue {
  @Prop() private image = { url: '' }
  private currentFile: any = ''
  private progress = 0
  private message = 'sdf'
  private icons = {
    mdiCameraAccount,
    mdiCloudUploadOutline,
  }

  private get url() {
    return this.image.url || ''
  }

  private selectFile(file: any) {
    this.progress = 0;
    this.currentFile = file;
  }

  private upload() {
    if (!this.currentFile) {
      // this.message = 'Please select a file!';
      return;
    }

    this.message = '';

    UploadService.upload(this.currentFile, (event) => {
      this.progress = Math.round((100 * event.loaded) / event.total);
    })
      .then((url) => {
        this.message = 'Изображение успешно загружено'
        this.$emit('uploaded', url)
      })
      .catch(() => {
        this.progress = 0;
        // this.message = 'Could not upload the file!';
        this.currentFile = undefined;
      });
  }

}
</script>