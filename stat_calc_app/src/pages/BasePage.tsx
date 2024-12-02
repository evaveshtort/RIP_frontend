import React, { ReactNode } from "react";
import { BreadCrumbs } from "../components/BreadCrumbs";
import { Link, NavLink } from "react-router-dom";
import "./BasePage.css";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { ROUTES } from "../../Routes.tsx";
import image from "../../public/icon.png";
import { useState } from 'react';

// Определение интерфейса для пропсов компонента
interface IBasePageProps {
  crumbs: { label: string; path?: string }[]; // Массив хлебных крошек
  children: ReactNode; // Дочерние элементы
}

const BasePage: React.FC<IBasePageProps> = ({ crumbs, children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  console.log('Render navbar', menuOpen);
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
            {/* <Nav.Link href="#ссылканарасчеты">Расчеты</Nav.Link> */}
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

