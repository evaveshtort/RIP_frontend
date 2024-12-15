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
import { cntMetricsSet, draftCalcIdSet, draftCalcSet } from "../features/calcSlice.ts";
import { dest_minio, dest_api } from "../target_config"
import axios from 'axios';

const MetricsListPage: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [error, setError] = useState('');
  const searchValue = useSelector((state: RootState) => state.metricsFilter.searchQuery); 
  const cntMetrics = useSelector((state: RootState) => state.calc.cntMetrics);
  const draftCalc = useSelector((state: RootState) => state.calc.draftCalc);
  const draftCalcId = useSelector((state: RootState) => state.calc.draftCalcId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    document.documentElement.style.setProperty('--button-color-hover', '#a0ed6f');
    getAllMetrics()
      .then((response) => {
        if (response.draft_calculation_id != -1) {
          dispatch(draftCalcSet())
          dispatch(draftCalcIdSet(response.draft_calculation_id.toString()))
          dispatch(cntMetricsSet(response.metrics_count))
        }
        setMetrics(response.metrics);
        setLoading(false);
        console.log(response)
      })
      .catch(() => {
        setMetrics(METRICS_MOCK.metrics);
        setLoading(false);
      });
  }, []);

  const handleSearch = () => {
    setLoading(true);
    document.documentElement.style.setProperty('--button-color-hover', '#e4c200');
    dispatch(triggerFilter());
    getMetricByName(searchValue)
      .then((response) => {
        setMetrics(response.metrics);
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

  const handleCalculationsClick = (calc_id: string) => {
    navigate(`/draft_calculation/${calc_id}`)
  };

  const handleCardClick = (id: number) => {
    navigate(`/metrics/${id}`);
  };

  const handleAddClick = async (id:number) => {
    try{
      const response = await axios.post( dest_api + '/metrics/' + id + '/add_to_calculation/')
      if (response.status = 200) {
        getAllMetrics()
        .then((response) => {
          dispatch(draftCalcSet())
          dispatch(draftCalcIdSet(response.draft_calculation_id.toString()))
          dispatch(cntMetricsSet(response.metrics_count))
        }
      )
      }
    }
    catch (err) {
      setError('Ошибка добавления метрики');
    }
  };

  const handleResetClick = () => {
    dispatch(resetFilter());
    dispatch(resetSearchQuery());
    setLoading(true);
    getAllMetrics()
      .then((response) => {
        setMetrics(response.metrics);
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
        { label: ROUTE_LABELS.HOME, path: ROUTES.HOME },
        { label: ROUTE_LABELS.METRICS, path: ROUTES.METRICS },
      ]}
    >
      {/* <div className="container" style={{ paddingLeft: "0" }}> */}
        <div className="underHead">
          <MetricFilter
            value={searchValue} 
            loading={loading}
            setValue={(newValue) => dispatch(setSearchQuery(newValue))}
            onSubmit={handleSearch}
            onReset={handleResetClick}
          />
          {draftCalc ? (<div className="cartWithNum">
              <div className="metricsNum">{cntMetrics}</div>
                <img
                  src={dest_minio + "/items/shopping-cart.png"}
                  style={{ height: "35px" }}
                  onClick={() => handleCalculationsClick(draftCalcId)}
                />
          </div>): (<></>)}
        </div>

        <MetricsList
          metrics={metrics}
          loading={loading}
          onCardClick={handleCardClick}
          addClick={handleAddClick}
          searchQuery={searchValue} 
        />
      {/* </div> */}
    </BasePage>
  );
};

export default MetricsListPage;








