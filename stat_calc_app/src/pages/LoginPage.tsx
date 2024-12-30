import { FC, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BasePage from "./BasePage";
import { ROUTES, ROUTE_LABELS } from "../../Routes.tsx";
import "./LoginPage.css";
import { dest_api } from "../target_config"
import { useDispatch } from "react-redux";
import { loginSuccess, setUserEmail, setIsStaff } from '../features/authSlice.ts';
import { resetState as resetDataState } from '../features/dataSlice';

const LoginPage: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async () => {
    try {
      const response = await axios.post( dest_api + '/users/login/', {
        "email":email,
        "password":password,
      });

      if (response.status = 200) {
        dispatch(resetDataState())
        dispatch(loginSuccess())
        dispatch(setUserEmail(email))
        try {
        const is_staff = await axios.get( dest_api + '/users/register/');
        if (is_staff.status = 200) {
          dispatch(setIsStaff())
        }
        } catch (error: any) {}
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
      <form className='login-form'
        onSubmit={(e) => {
          e.preventDefault();
          login();
        }}
      >
        <div>
          <label style = {{width: "170px"}} htmlFor="email">Электронная почта</label>
          <input className='login-input'
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label style = {{width: "170px"}} htmlFor="password">Пароль</label>
          <input className='login-input'
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className='login-button' type="submit">Войти</button>
      </form>
      {error && <div className="error-message">{error}</div>}
    </div>
    </BasePage>
  );
};

export default LoginPage;
