<template>
  <div>
    <el-card class="box-card" style="width: 100%;height: 100%">
      <div slot="header" class="clearfix">
        <span>Let's describe a picture!</span>
      </div>
      <div v-if="!imageUploaded" class="upload-container">
        <el-upload
          :on-remove="handleRemove"
          :file-list="fileList"
          list-type="picture-card"
          :before-upload="beforeUpload"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </div>
      <div v-else>
      <div class="image-container">
        <img :src="dialogImageUrl" alt="Uploaded image" class="uploaded-image" />
      </div>
        <div v-if="description" class="description-container">
          <h2>{{ description }}</h2>
        </div>
      <div class="button-container">
        <el-button type="primary" @click="resetUpload">Upload New Image</el-button>
      </div>
      </div>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="preview image" />
      </el-dialog>

      <el-divider></el-divider>
      <el-table
        :show-overflow-tooltip="true"
        :data="historyList"
        border
        style="width: 100%"
      >
        <el-table-column
          type="index"
          label="index"
          width="60px">
        </el-table-column>
        <el-table-column
          prop="description"
          label="description"
        >
        </el-table-column>
        <el-table-column
          sortable
          prop="createTime"
          label="create date"
        >
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          label="options"
          width="360px">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-ico-edit" @click="overview(scope.row)">
              overview
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="current"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getImage, getImageHistory, uploadImage } from '@/api/image'

export default {
  name: 'Image',
  data() {
    return {
      historyList: [],
      current: 1,
      total: undefined,
      size: 5,
      fileList: [],
      dialogImageUrl: '',
      dialogVisible: false,
      description: '',
      imageUploaded: false
    };
  },
  created () {
    this.getHistory()
  },
  methods: {
    handleSizeChange (val) {
      this.size = val
      this.getHistory()
    },
    handleCurrentChange (val) {
      this.current = val
      this.getHistory()
    },
    async overview(row) {
      try {
        console.log(row.description)
        const { data } = await getImage(row.filePath); // 假设每行数据有一个唯一的 id 属性
        const imageBytes = new Uint8Array(atob(data.data.imageContent).split('').map(char => char.charCodeAt(0)));
        const imageBlob = new Blob([imageBytes], { type: data.data.mimeType });
        this.dialogImageUrl = URL.createObjectURL(imageBlob);
        this.description = row.description; // 根据你的API返回的数据结构来获取描述
        console.log(this.description)
        this.imageUploaded = true;
      } catch (error) {
        this.$message.error('Failed to get image!');
      }
    },


    async resetUpload() {
      this.imageUploaded = false;
      this.dialogImageUrl = '';
      this.description = '';
      this.fileList = [];
    },
    async handlePreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    async handleRemove(file, fileList) {
      this.fileList = fileList;
    },
    async beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';
      const isLt10M = file.size / 1024 / 1024 < 10;

      if (!isJPG && !isPNG) {
        this.$message.error('Just support JPG/PNG format.');
      }
      if (!isLt10M) {
        this.$message.error("Image size can't over 10MB!");
      }
      if ((isJPG || isPNG) && isLt10M) {
        try {
          let formData = new FormData();
          formData.append('file', file);
          const {data} = await uploadImage(formData);
          if(data.isSuccess == false){
            this.$message.error('This picture is not supported!');
          }
          this.description = data.data.description; // 根据你的API返回的数据结构来获取识别结果
          this.imageUploaded = true;
          this.dialogImageUrl = URL.createObjectURL(file);
        } catch (error) {
          this.$message.error('Upload failed!');
        }
      }
      this.getHistory()
      // 返回false以阻止默认的上传行为
      return false;
    },

    async getHistory(){
      const {data} = await getImageHistory(this.current, this.size)
      this.historyList = data.data.records
      this.total = data.data.total
    }
  }
};
</script>

<style scoped>
.upload-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}
.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}
.uploaded-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.description-container {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

</style>
