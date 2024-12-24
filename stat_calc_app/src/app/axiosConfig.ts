import axios from 'axios';
import { NavigateFunction } from 'react-router-dom';

export const configureAxios = (navigate: NavigateFunction) => {
  axios.interceptors.response.use(
    (response) => response, // Успешный ответ
    (error) => {
      if (error.response) {
        const status = error.response.status;
        if (status === 403) {
          navigate('/forbidden');
        } else if (status === 404) {
          navigate('/not_found');
        }
      }
      return Promise.reject(error); // Передача ошибки дальше
    }
  );
};
