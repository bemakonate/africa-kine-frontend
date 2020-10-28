import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.CMS_REST_API_URL || 'http://localhost:1337'
});

export default instance;