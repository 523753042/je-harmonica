import Axios from 'axios';

//创建axios实例
const instance = Axios.create({ timeout: 25000 }); // TODO 5s测试环境容易炸了


/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
instance.interceptors.request.use(
    config => {
        return config;
    },
    error => Promise.reject(error)
);
instance.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8';
// instance.defaults.headers['Authorization'] = 'token f718051f3f27394eebe655983f69fc1c671f9b10';
// instance.defaults.withCredentials = true

/**
 * 响应拦截器
 * 拦截响应并统一处理
 */

instance.interceptors.response.use(
    res => {
        return Promise.resolve(res.data);
    },
    error => {
        const { response } = error;
        return Promise.reject(response);
    }
);


export default instance;
