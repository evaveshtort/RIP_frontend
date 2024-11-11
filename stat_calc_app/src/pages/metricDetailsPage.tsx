import "./metricDetailsPage.css";
import { FC, useEffect, useState } from "react";
import { BreadCrumbs } from "../components/BreadCrumbs";
import { ROUTES, ROUTE_LABELS } from "../../Routes";
import { useParams } from "react-router-dom";
import { Metric, getMetricById } from "../modules/StatisticianApi";
import { Col, Row, Spinner, Image } from "react-bootstrap";
// import { ALBUMS_MOCK } from "../../modules/mock";
import defaultImage from "../components/DefaultImage.png";

export const MetricDetailsPage: FC = () => {
  const [pageData, setPageDdata] = useState<Metric>();

  const { id } = useParams();
  console.log("Полученный ID:", id); // ид страницы, пример: "/albums/12"

  useEffect(() => {
    if (!id) return;
    getMetricById(id)
      .then((response) => setPageDdata(response));
  }, [id]);

  return (
    <div>
      <BreadCrumbs
        crumbs={[
          { label: ROUTE_LABELS.METRICS, path: ROUTES.METRICS },
          { label: pageData?.title || "Метрика" },
        ]}
      />
      {pageData ? ( // проверка на наличие данных, иначе загрузка
        <div className="container">
          <Row>
            <Col md={6}>
              <p>
                Метрика: <strong>{pageData.title}</strong>
              </p>
            </Col>
            <Col md={6}>
              <Image
                src={pageData.picture_url || defaultImage} 
                alt="Картинка"
                width={100}
              />
            </Col>
          </Row>
        </div>
      ) : (
        <div className="album_page_loader_block">{/* загрузка */}
          <Spinner animation="border" />
        </div>
      )}
    </div>
  );
};