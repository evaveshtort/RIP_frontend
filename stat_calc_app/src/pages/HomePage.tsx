import { FC } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../Routes.tsx";
import { Button, Col, Row } from "react-bootstrap";
import "./HomePage.css"
import BasePage from "./BasePage";

export const HomePage: FC = () => {
  return (
    <BasePage crumbs={[{ label: "", path: ROUTES.HOME }]}>
      <div className="container">
        <Row>
          <Col md={6}>
            <h1>Добро пожаловать в Statistician!</h1>
            <p>Здесь вы можете считать статистические метрики.</p>
            <Link to={ROUTES.METRICS}>
              <Button className="seeAll">Начать</Button>
            </Link>
          </Col>
        </Row>
      </div>
    </BasePage>
  );
};