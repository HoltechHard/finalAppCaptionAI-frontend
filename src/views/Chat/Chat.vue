<template>
  <div class="wrap">
<el-card class="el-card">
<el-form>
  <article class="markdown-body" v-html='this.allText'></article>
  <el-divider></el-divider>
  <el-form-item style="text-align: center">
    <el-button style="text-align: center" type="primary" size="mini" id="disconnectSSE" @click="disconnect">stop generating</el-button>
  </el-form-item>
  <el-form-item :inline="true">
  <el-input

    type="textarea"
    :autosize="{maxRows: 10}"
    @keydown.shift.enter.native="sendMessage"
    placeholder="'enter'change line,'shift+enter'send message"
    v-model="inputQuestionContent"
    :disabled="isTransferring">
  </el-input>
<!--    <el-button type="primary" size="mini" style="width: 9%;margin-left: 1%" @click="sendMessage">发送</el-button>-->
    <el-form-item style="text-align: center">
    <el-button type="primary" size="mini" @click="sendMessage">send</el-button>
    </el-form-item>
  </el-form-item>
</el-form>
</el-card>
  </div>
</template>

<script>
import { marked } from 'marked'
import {EventSourcePolyfill} from 'event-source-polyfill';
export default {
  name: 'Chat',
  data(){
    return{
      inputQuestionContent:'',
      answerContent:'',
      sse:"",
      allText:"",
      encodeQuestion:"",
      isTransferring:false,
    }
  },
  created () {

  },
  computed: {
    allText() {
      return marked(this.allText);
    }
  },
  mounted () {
    // this.connectToServer()
  },
  methods:{
    codeMarked(code){
      return marked(code)
    },

    disconnect(){
      if (this.sse) {
        this.sse.close();
        this.isTransferring=false
      }
    },

    connectToServer () {
      let disconnectBtn = document.getElementById("disconnectSSE");
      let messageElement = document.getElementById("message");
      let chat = document.getElementById("chat");
      // let sse;
      let uid = window.localStorage.getItem("uid");
      // 设置本地存储
      window.localStorage.setItem("uid", uid);

      disconnectBtn.onclick = function () {
        if (this.sse) {
          sse.close();
        }
      };

    },
    encodeURIComponent(){
      this.encodeQuestion = encodeURIComponent(this.inputQuestionContent)
    },
    // 回车事件
    sendMessage(){
      this.isTransferring=true
      this.encodeURIComponent()
        if (!this.inputQuestionContent) {
          this.isTransferring=false
          return;
        }
      //新增问题框
      this.allText+=
        '<div style="background-color: rgba(247,247,248)">'+
        '<p>' +
        this.inputQuestionContent+
        '</p>'+
        '</div>'
      this.inputQuestionContent = ''
      // //新增答案框
      this.allText+= this.answerContent
      //理工云服务器：http://192.168.199.88:8080
        const eventSource = new EventSourcePolyfill('http://192.168.199.88:8080/chatGPT/chat?message=' + this.encodeQuestion,
          {
            withCredentials: true
          });
        eventSource.onopen = (event) => {
          this.sse = event.target;
        };
        eventSource.onmessage = (event) => {
          // console.log(event.data)
          if (event.data === "[DONE]") {
            this.allText = marked(this.allText)
            this.answerContent = '';
            if (this.sse) {
              // console.log(this.sse)
              this.sse.close();
            }
            this.isTransferring=false
            return;
          }
          let json_data = JSON.parse(event.data)
          if (json_data.content == null || json_data.content === 'null') {
            this.answerContent = '';
            return;
          }
          this.answerContent = json_data.content;
          this.allText += this.answerContent
        };
        eventSource.onerror = (event) => {
          // console.log("onerror", event);
          if (event.readyState === EventSource.CLOSED) {
          } else {
            // console.log("Error occured", event);
          }
          event.target.close();
          this.isTransferring=false
        };
        eventSource.addEventListener("customEventName", (event) => {
          // console.log("Message id is " + event.lastEventId);
        });
    },
  }
}
</script>

<style lang="less" scoped>
.el-card{
  position: relative;
  height: 100%;
  padding-bottom: 0;
}

.chatInput{
  height: 40px;
  //width: 100%;
  /* 绝对定位 */
  position: absolute;
  bottom: 0
}
.wrap {
  overflow:scroll
}
.wrap::-webkit-scrollbar {
  display: none;
}

</style>
