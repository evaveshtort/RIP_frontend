import React, { ReactNode } from "react";
import { BreadCrumbs } from "../components/BreadCrumbs";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./BasePage.css";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { ROUTES } from "../../Routes.tsx";
import image from "/icon.png";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { dest_api } from "../target_config"
import axios from 'axios';
import { resetState as resetAuthState } from '../features/authSlice';
import { resetState as resetMetricsFilterState } from '../features/metricsFilterSlice';
import { resetState as resetCalcState } from '../features/calcSlice';
import { resetState as resetDataState } from '../features/dataSlice';

// Определение интерфейса для пропсов компонента
interface IBasePageProps {
  crumbs: { label: string; path?: string }[]; // Массив хлебных крошек
  children: ReactNode; // Дочерние элементы
}

const BasePage: React.FC<IBasePageProps> = ({ crumbs, children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLoggedIn, email, is_staff } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await axios.post( dest_api + '/users/logout/', {});

      if (response.status = 200) {
        dispatch(resetAuthState()); 
        dispatch(resetMetricsFilterState()); 
        dispatch(resetCalcState()); 
        dispatch(resetDataState());
        navigate(ROUTES.METRICS)
      }
    } catch (error: any) {
      console.log('Ошибка логаута');
    }
  };
  return (
    <div className="base-page">
      <div className="upper">
        <img src= {image} style={{height:"30px"}} />
        <Link to="/" className="mainLink" style={{ textDecoration: "none", color: "inherit" }} 
        onMouseEnter={(e) => e.preventDefault()} >
          Statistician
        </Link>

        <Navbar expand="lg">
          <Nav className="navbarr">
            <Nav.Link as={NavLink} to={ROUTES.METRICS} className="nav-link">Метрики</Nav.Link>
            {!isLoggedIn ? (
              <Nav.Link as={NavLink} to={ROUTES.LOGIN} className="nav-link">Войти</Nav.Link>
            ) : (
              <>
                {is_staff && <Nav.Link as={NavLink} to={ROUTES.CHANGE} className="nav-link">Редактирование</Nav.Link>}
                <Nav.Link as={NavLink} to={ROUTES.CALCS} className="nav-link">Вычисления</Nav.Link>
                <Nav.Link as={NavLink} to={ROUTES.ACCOUNT} className="nav-link">Личный кабинет {email.split('@')[0]}</Nav.Link>
                <Nav.Link onClick={handleLogout} className="nav-link">Выйти</Nav.Link>
              </>
      )}
          </Nav>
          <div
            className={`nav__mobile-wrapper ${menuOpen ? 'active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className="nav__mobile-target" />
            <div className="nav__mobile-menu">
              <Nav.Link as={NavLink} to={ROUTES.METRICS} className="nav-link">
                Метрики
              </Nav.Link>
              {!isLoggedIn ? (
                      <Nav.Link as={NavLink} to={ROUTES.LOGIN} className="nav-link">
                      Войти
                    </Nav.Link>
                    ) : (
                      <>
                        <Nav.Link as={NavLink} to={ROUTES.CALCS} className="nav-link">Вычисления</Nav.Link>
                        <Nav.Link as={NavLink} to={ROUTES.ACCOUNT} className="nav-link">
                          Личный кабинет {email.split('@')[0]}
                        </Nav.Link>
                        <Nav.Link onClick={handleLogout} className="nav-link">Выйти</Nav.Link>
                      </>
              )}
            </div>
          </div>
      </Navbar>
      </div>
      <div className="crumbs">
          <BreadCrumbs crumbs={crumbs} />
      </div>
      
      <div className="body">{children}</div>
    </div>
  );
};

export default BasePage;

