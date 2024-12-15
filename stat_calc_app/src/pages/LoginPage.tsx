import { FC, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BasePage from "./BasePage";
import { ROUTES, ROUTE_LABELS } from "../../Routes.tsx";
import "./LoginPage.css";
import { dest_api } from "../target_config"
import { useDispatch } from "react-redux";
import { loginSuccess, setUserEmail } from '../features/authSlice.ts';

const LoginPage: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = async () => {
    try {
      const response = await axios.post( dest_api + '/users/login/', {
        "email":email,
        "password":password,
      });

      if (response.status = 200) {
        dispatch(loginSuccess())
        dispatch(setUserEmail(email))

        navigate(ROUTES.METRICS)
      }
    } catch (error: any) {
      setError('Ошибка авторизации. Проверьте данные.');
    }
  };

  return (
    <BasePage crumbs={[{ label: ROUTE_LABELS.HOME, path: ROUTES.HOME },
    { label: ROUTE_LABELS.LOGIN, path: ROUTES.LOGIN }]}>
    <div className="login-container">
      <h2>Авторизация</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login();
        }}
      >
        <div>
          <label htmlFor="email">Электронная почта:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Пароль:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Войти</button>
      </form>
      {error && <div className="error-message">{error}</div>}
    </div>
    </BasePage>
  );
};

export default LoginPage;
