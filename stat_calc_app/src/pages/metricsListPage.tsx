import "./metricsListPage.css";
import { FC, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { Metric, getMetricByName } from "../modules/StatisticianApi";
import InputField from "../components/InputField";
import { BreadCrumbs } from "../components/BreadCrumbs";
import { ROUTES, ROUTE_LABELS } from "../../Routes";
import { MetricCard } from "../components/MetricCard";
import { useNavigate } from "react-router-dom";

const MetricsListPage: FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [metric, setMetric] = useState<Metric[]>([]);

  const navigate = useNavigate();

  const handleSearch = () => {
    setLoading(true);
    getMetricByName(searchValue)
      .then((response) => {
        console.log("Response from server:", response)
        setMetric(
          response.metrics
        );
        setLoading(false);
      })
      // .catch(() => { // В случае ошибки используем mock данные, фильтруем по имени
      //   setMusic(
      //     SONGS_MOCK.results.filter((item) =>
      //       item.collectionCensoredName
      //         .toLocaleLowerCase()
      //         .startsWith(searchValue.toLocaleLowerCase())
      //     )
      //   );
      //   setLoading(false);
      // });
  };
  const handleCardClick = (id: number) => {
    // клик на карточку, переход на страницу альбома
    navigate(`${ROUTES.METRICS}/${id}`);
  };

  return (
    <div className="container">
      <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.METRICS }]} />
      
      <InputField
        value={searchValue}
        setValue={(value) => setSearchValue(value)}
        loading={loading}
        onSubmit={handleSearch}
      />

      {loading && ( // здесь можно было использовать тернарный оператор, но это усложняет читаемость
        <div className="loadingBg">
          <Spinner animation="border" />
        </div>
      )}
      {!loading &&
        (!metric.length /* Проверка на существование данных */ ? (
          <div>
            <h1>К сожалению, пока ничего не найдено :(</h1>
          </div>
        ) : (
          <Row xs={4} md={4} className="g-4">
            {metric.map((item, index) => (
              <Col key={index}>
                <MetricCard
                  imageClickHandler={() => handleCardClick(item.metric_id)}
                  {...item}
                />
              </Col>
            ))}
          </Row>
        ))}
    </div>
  );
};

export default MetricsListPage;
