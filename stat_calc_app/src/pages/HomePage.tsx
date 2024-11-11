import { FC } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../Routes.tsx";
import { Button, Col, Row } from "react-bootstrap";
import "./HomePage.css"

export const HomePage: FC = () => {
  return (
    <div className="container">
      <Row>
        <Col md={6}>
          <h1>Statistician</h1>
          <p>
            Добро пожаловать в Statitician! Здесь вы можете считать статистические метрики.
          </p>
          <Link to={ROUTES.METRICS}>
            <Button variant="primary">Посмотреть метрики</Button>
          </Link>
        </Col>
      </Row>
    </div>
  );
};