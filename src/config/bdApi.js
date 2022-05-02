import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://bancomex-improving.herokuapp.com/api/v1'
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