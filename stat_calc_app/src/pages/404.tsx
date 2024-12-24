import { FC } from "react";
import { ROUTES, ROUTE_LABELS } from "../../Routes.tsx";
import { Col } from "react-bootstrap";
import BasePage from "./BasePage";

export const NotFoundPage: FC = () => {
  return (
    <BasePage crumbs={[{ label: ROUTE_LABELS.HOME, path: ROUTES.HOME }]}>
      <div className="container">
        <Col md={12} className="text-center">
          <h1 className="error-code">404</h1>
          <h3 className="error-message">Страница не найдена</h3>
          <p className="error-description">
            К сожалению, запрашиваемая страница не существует. Возможно, вы ошиблись в адресе, или страница была удалена.
          </p>
        </Col>
      </div>
    </BasePage>
  );
};
