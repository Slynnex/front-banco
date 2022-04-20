import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:9000/api/v1'
});

instance.interceptors.request.use(
    async(config)=> {
        const token = localStorage.getItem('token')
        if(token) {
            config.headers.authorization = `Bearer ${token}`;
        }

        return config;
    },
    (err) => {
        return Promise.reject.apply(err);
    }
);

export default instance;