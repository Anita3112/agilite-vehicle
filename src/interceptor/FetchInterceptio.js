import axios from 'axios';
import { API_BASE_URL } from '../config/AppConfig';
import { notification } from 'antd';

let notificationParam = {
    message: '',
}

console.log('API_BASE_URL', API_BASE_URL);
const service = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000
});

//we can configure axios header as well

//handle errors on API response

service.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        if (error.response.status === 404) {
            notificationParam.message = 'Not Found'
        }
        else if (error.response.status === 500) {
            notificationParam.message = 'Internal Server Error'
        }
        else if (error.response.status === 401) {
            notificationParam.message = 'Unauthorized'
        }
        else if (error.response.status === 403) {
            notificationParam.message = 'Forbidden'
        }
        else if (error.response.status === 400) {
            notificationParam.message = 'Bad Request'
        }
        else if (error.response.status === 405) {
            notificationParam.message = 'Method Not Allowed'
        }
        else if (error.response.status === 508) {
            notificationParam.message = 'Time Out'
        }
        else{
            notificationParam.message = 'Something went wrong'
        }

        notification.error(notificationParam);
        return Promise.reject(error);
    }
);

export default service;




