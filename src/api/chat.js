import axios from 'axios'

axios({
  method: 'get',
  url: '/chatGPT/chat',
  responseType: 'stream'
}).then(response => {
  const eventSource = new EventSource('/chatGPT/chat');

  eventSource.onmessage = function(event) {
    const data = JSON.parse(event.data);
    // 处理数据
  };

  eventSource.onerror = function(event) {
    // 处理错误
  };
});
