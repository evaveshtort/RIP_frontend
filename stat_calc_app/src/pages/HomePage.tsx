import { FC } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../Routes.tsx";
import { Button, Col, Container, Row } from "react-bootstrap";

export const HomePage: FC = () => {
  return (
    <Container>
      <Row>
        <Col md={6}>
          <h1>Statistician</h1>
          <p>
            Добро пожаловать в Statitician! Здесь вы можете счиать статистические метрики.
          </p>
          <Link to={ROUTES.METRICS}>
            <Button variant="primary">Посмотреть метрики</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};