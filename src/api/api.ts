import axios from 'axios';

const api = axios.create({
  headers: {
    Cookie:
      '_ga=GA1.2.2019060757.1751847265; nicc_acc=1; PHPSESSID=h2i6f6k9j12s70i5ma6chm28p4; _gid=GA1.2.717792268.1751867677; _gat=1'
  }
});

export default api;
