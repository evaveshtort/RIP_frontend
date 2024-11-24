import "./metricsListPage.css";
import { FC, useState, useEffect } from "react";
import { Metric, getAllMetrics, getMetricByName } from "../modules/StatisticianApi";
import { useNavigate } from "react-router-dom";
import BasePage from "./BasePage";
import { ROUTES, ROUTE_LABELS } from "../../Routes.tsx";
import { METRICS_MOCK } from "../modules/mock";
import MetricsList from "../components/MetricsList";
import MetricFilter from "../components/MetricsFilter";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery, triggerFilter, resetFilter, resetSearchQuery} from "../features/metricsFilterSlice";
import { RootState } from "../app/store";
import '../components/InputField.css';

const MetricsListPage: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [resetFlag, setResetFlag] = useState<boolean>(false);
  const searchValue = useSelector((state: RootState) => state.metricsFilter.searchQuery); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    document.documentElement.style.setProperty('--button-color-hover', '#a0ed6f');
    getAllMetrics()
      .then((response) => {
        setMetrics(response.metrics);
        setResetFlag(response.reset_flag);
        setLoading(false);
      })
      .catch(() => {
        setMetrics(METRICS_MOCK.metrics);
        setLoading(false);
      });
  }, []);

  const handleSearch = () => {
    console.log("handleSearch вызван");
    setLoading(true);
    document.documentElement.style.setProperty('--button-color-hover', '#e4c200');
    dispatch(triggerFilter());
    getMetricByName(searchValue)
      .then((response) => {
        setMetrics(response.metrics);
        setResetFlag(response.reset_flag);
        setLoading(false);
      })
      .catch(() => {
        setMetrics(
          METRICS_MOCK.metrics.filter((item) =>
            item.title.toLocaleLowerCase().startsWith(searchValue.toLocaleLowerCase())
          )
        );
        setLoading(false);
      });
  };

  const handleCardClick = (id: number) => {
    navigate(`/metrics/${id}`);
  };

  const handleResetClick = () => {
    dispatch(resetFilter());
    dispatch(resetSearchQuery());
    setLoading(true);
    getAllMetrics()
      .then((response) => {
        setMetrics(response.metrics);
        setResetFlag(response.reset_flag);
        setLoading(false);
      })
      .catch(() => {
        setMetrics(METRICS_MOCK.metrics);
        setLoading(false);
      });
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
          <MetricFilter
            value={searchValue} 
            loading={loading}
            setValue={(newValue) => dispatch(setSearchQuery(newValue))}
            onSubmit={handleSearch}
            onReset={handleResetClick}
            resetFlag={resetFlag}
          />
        </div>

        <MetricsList
          metrics={metrics}
          loading={loading}
          onCardClick={handleCardClick}
          searchQuery={searchValue} 
        />
      </div>
    </BasePage>
  );
};

export default MetricsListPage;








