import axios from 'axios'

const instance = axios.create({
  //本地：http://localhost:8080
  //部署时：http://192.168.199.88:8080
  baseURL: 'http://192.168.199.88:8080',
  timeout: 50000,
});

export default instance;
