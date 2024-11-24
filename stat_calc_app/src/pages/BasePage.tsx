import React, { ReactNode } from "react";
import { BreadCrumbs } from "../components/BreadCrumbs";
import { Link } from "react-router-dom";
import "./BasePage.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { ROUTES } from "../../Routes.tsx";

// Определение интерфейса для пропсов компонента
interface IBasePageProps {
  crumbs: { label: string; path?: string }[]; // Массив хлебных крошек
  children: ReactNode; // Дочерние элементы
}

const BasePage: React.FC<IBasePageProps> = ({ crumbs, children }) => {
  return (
    <div className="base-page">
      <div className="upper">
        <img src="http://localhost:9000/items/icon.png" style={{height:"30px"}} />
        <Link to="/" className="mainLink" style={{ textDecoration: "none", color: "inherit" }} 
        onMouseEnter={(e) => e.preventDefault()} >
          Statistician
        </Link>

        <Navbar bg="none" expand="lg">
          <Nav className="navbar">
            <Nav.Link href={ROUTES.METRICS}>Метрики</Nav.Link>
            {/* <Nav.Link href="#ссылканарасчеты">Расчеты</Nav.Link> */}
          </Nav>
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

