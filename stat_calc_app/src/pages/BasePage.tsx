import React, { ReactNode } from "react";
import { BreadCrumbs } from "../components/BreadCrumbs";
import { Link } from "react-router-dom";
import "./BasePage.css";

// Определение интерфейса для пропсов компонента
interface IBasePageProps {
  crumbs: { label: string; path?: string }[]; // Массив хлебных крошек
  children: ReactNode; // Дочерние элементы
}

const BasePage: React.FC<IBasePageProps> = ({ crumbs, children }) => {
  return (
    <div>
      {/* Статичный верхний заголовок */}
      <div className="upper">
        <img src="http://localhost:9000/items/icon.png" style={{height:"30px"}} />
        <Link to="/" className="mainLink" style={{ textDecoration: "none", color: "inherit" }} 
        onMouseEnter={(e) => e.preventDefault()} >
          Statistician
        </Link>
        {/* Хлебные крошки */}
      <BreadCrumbs crumbs={crumbs} />
      </div>
      
      {/* Основной контент страницы */}
      <div className="body">{children}</div>
    </div>
  );
};

export default BasePage;

