import { FC } from "react";
import { ROUTES, ROUTE_LABELS } from "../../Routes.tsx";
import { Col } from "react-bootstrap";
import BasePage from "./BasePage";

export const ForbiddenPage: FC = () => {
  return (
    <BasePage crumbs={[{ label: ROUTE_LABELS.HOME, path: ROUTES.HOME }]}>
      <div className="container">
        <Col md={12} className="text-center">
          <h1 className="error-code">403</h1>
          <h3 className="error-message">Доступ запрещен</h3>
          <p className="error-description">
            У вас нет прав для доступа к этой странице. Пожалуйста, свяжитесь с
            администратором, если вы считаете, что это ошибка.
          </p>
        </Col>
      </div>
    </BasePage>
  );
};
