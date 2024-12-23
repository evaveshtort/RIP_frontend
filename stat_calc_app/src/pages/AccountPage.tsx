import React, { useState } from 'react';
import { api } from '../api';
import { dest_api } from "../target_config";
import axios from 'axios';
import BasePage from "./BasePage";
import { ROUTES, ROUTE_LABELS } from "../../Routes.tsx";
import './AccountPage.css'

const AccountPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      if (email != '' && password != '') {
        await api.users.usersUpdateUpdate({"email": email, "password": password});
      }
      else{
        if (email != '') {
            await axios.put( dest_api + '/users/update/', {
                "email":email,
              });
        }
        else {
            if (password != '') {
                await axios.put( dest_api + '/users/update/', {
                    "password": password,
                });
            }
        }
      }
      setIsLoading(false);
      setError('');
    } catch (err) {
      setIsLoading(false);
      setError('Ошибка обновления профиля');
    }
  };

  return (
    <BasePage crumbs={[{ label: ROUTE_LABELS.HOME, path: ROUTES.HOME },
    { label: ROUTE_LABELS.ACCOUNT, path: ROUTES.ACCOUNT }]}>
    <div className="profile-page">

      <form className="profile-form" onSubmit={handleSubmit}>
        <div>
          <label className='profile-label' htmlFor="email">Email</label>
          <input
            className='profile-input'
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className='profile-label' htmlFor="password">Пароль</label>
          <input
            className='profile-input'
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button className="profile-button" type="submit" disabled={isLoading}>
          {isLoading ? 'Загрузка...' : 'Обновить профиль'}
        </button>
      </form>
    </div>
    </BasePage>
  );
};

export default AccountPage;
