import "./metricsListPage.css";
import { FC, useState, useEffect } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { Metric, getAllMetrics, getMetricByName } from "../modules/StatisticianApi";
import InputField from "../components/InputField";
import { MetricCard } from "../components/MetricCard";
import { useNavigate } from "react-router-dom";
import BasePage from "./BasePage";
import { ROUTES, ROUTE_LABELS } from "../../Routes.tsx";
import { METRICS_MOCK } from "../modules/mock";

const MetricsListPage: FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [cnt_metrics, setCnt] = useState<number>(0);
  const [calculation_id, setId] = useState<number>(0);
  const [reset_flag, setFlag] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getAllMetrics()
    .then((response) => {
      setMetrics(response.metrics);
      setCnt(response.metrics_count);
      setId(response.draft_calculation_id);
      setFlag(response.reset_flag);
      setLoading(false);
    })
    .catch(() => { 
      setMetrics(
        METRICS_MOCK.metrics
      );
      setLoading(false);
    });
  }, []);

  const handleSearch = () => {
    setLoading(true);
    getMetricByName(searchValue)
    .then((response) => {
      setMetrics(response.metrics);
      setCnt(response.metrics_count);
      setId(response.draft_calculation_id);
      setFlag(response.reset_flag);
      setLoading(false);
    })
    .catch(() => { // В случае ошибки используем mock данные, фильтруем по имени
      setMetrics(
        METRICS_MOCK.metrics.filter((item) =>
          item.title
            .toLocaleLowerCase()
            .startsWith(searchValue.toLocaleLowerCase())
        )
      );
      setLoading(false);
    });
  };
  

  const handleCardClick = (id: number) => {
    navigate(`/metrics/${id}`);
  };

  const handleResetClick = () => {
    window.location.reload();
  };

  return (
    <BasePage
      crumbs={[
        { label: "", path: ROUTES.HOME },
        { label: ROUTE_LABELS.METRICS, path: ROUTES.METRICS },
      ]}
    >
      <div className="container">  
        <div className="underHead">
          <div className="searchForm">
            <InputField
              value={searchValue}
              setValue={(value) => setSearchValue(value)}
              loading={loading}
              onSubmit={handleSearch}
              placeholder="Название метрики:"
            /> 
            {reset_flag && (<img
              src="http://localhost:9000/items/reset.png" 
              style={{ width: "50px", cursor: "pointer", position: "relative", zIndex: 1 }}
              onClick={handleResetClick}
            />)}
          </div>
          <div className="cartWithNum">
              <div className="metricsNum">{cnt_metrics}</div>
                <img
                  src="http://localhost:9000/items/shopping-cart.png"
                  style={{ height: "35px" }}
                />
            </div>
        </div>

        {loading && (
          <div className="loadingBg">
            <Spinner animation="border" />
          </div>
        )}
        
        {!loading && (
          (!metrics.length || metrics.length === 0) ? (
          <div className="emptyList">
            К сожалению, пока ничего не найдено
          </div>
        ) : (
          <ul>
            {metrics.map((metric) => (
              <MetricCard
                key = {metric.metric_id}
                title={metric.title}
                picture_url={metric.picture_url}
                imageClickHandler={() => handleCardClick(metric.metric_id)}
              />
            ))}
          </ul>
        ))}
      </div>
    </BasePage>
  );
};

export default MetricsListPage;

