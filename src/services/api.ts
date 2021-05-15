import axios from 'axios';

const api = axios.create({
    baseURL: 'http://projectpeshop-com-br.umbler.net/',
});

export default api;