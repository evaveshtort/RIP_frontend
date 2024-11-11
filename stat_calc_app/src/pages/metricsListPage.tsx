// import "./metricsListPage.css";
// import { FC, useState } from "react";
// import { Col, Row, Spinner } from "react-bootstrap";
// import { Metric, getMetricByName } from "../modules/StatisticianApi";
// import InputField from "../components/InputField";
// import { BreadCrumbs } from "../components/BreadCrumbs";
// import { ROUTES, ROUTE_LABELS } from "../../Routes";
// import { MetricCard } from "../components/MetricCard";
// import { useNavigate } from "react-router-dom";

// const MetricsListPage: FC = () => {
//   const [searchValue, setSearchValue] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [metric, setMetric] = useState<Metric[]>([]);

//   const navigate = useNavigate();

//   const handleSearch = () => {
//     setLoading(true);
//     getMetricByName(searchValue)
//       .then((response) => {
//         console.log("Response from server:", response)
//         setMetric(
//           response.metrics
//         );
//         setLoading(false);
//       })
//       // .catch(() => { // В случае ошибки используем mock данные, фильтруем по имени
//       //   setMusic(
//       //     SONGS_MOCK.results.filter((item) =>
//       //       item.collectionCensoredName
//       //         .toLocaleLowerCase()
//       //         .startsWith(searchValue.toLocaleLowerCase())
//       //     )
//       //   );
//       //   setLoading(false);
//       // });
//   };
//   const handleCardClick = (id: number) => {
//     // клик на карточку, переход на страницу альбома
//     navigate(`${ROUTES.METRICS}/${id}`);
//   };

//   return (
//     <div className="container">
//       <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.METRICS }]} />
      
//       <InputField
//         value={searchValue}
//         setValue={(value) => setSearchValue(value)}
//         loading={loading}
//         onSubmit={handleSearch}
//       />

//       {loading && ( // здесь можно было использовать тернарный оператор, но это усложняет читаемость
//         <div className="loadingBg">
//           <Spinner animation="border" />
//         </div>
//       )}
//       {!loading &&
//         (!metric.length /* Проверка на существование данных */ ? (
//           <div>
//             <h1>К сожалению, пока ничего не найдено :(</h1>
//           </div>
//         ) : (
//           <Row xs={4} md={4} className="g-4">
//             {metric.map((item, index) => (
//               <Col key={index}>
//                 <MetricCard
//                   imageClickHandler={() => handleCardClick(item.metric_id)}
//                   {...item}
//                 />
//               </Col>
//             ))}
//           </Row>
//         ))}
//     </div>
//   );
// };

// export default MetricsListPage;

import "./metricsListPage.css";
import { FC, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { Metric, getMetricByName } from "../modules/StatisticianApi";
import InputField from "../components/InputField";
import { MetricCard } from "../components/MetricCard";
import { useNavigate } from "react-router-dom";

const MetricsListPage: FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [cnt_metrics, setCnt] = useState<number>(0);
  const [calculation_id, setId] = useState<number>(0);
  const [reset_flag, setFlag] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    setLoading(true);
    getMetricByName(searchValue).then((response) => {
      setMetrics(response.metrics);
      setLoading(false);
      setCnt(response.metrics_count);
      setId(response.draft_calculation_id);
      setFlag(response.reset_flag)
    });
  };

  const handleCardClick = (id: number) => {
    navigate(`/metrics/${id}`);
  };

  const handleResetClick = () => {
    window.location.reload();
  };

  return (
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

      {loading ? (
        <div className="loadingBg">
          <Spinner animation="border" />
        </div>
      ) : !metrics.length ? (
        <div className="emptyList">
          К сожалению, пока ничего не найдено
        </div>
      ) : (
        
        <ul>
          {metrics.map((metric) => (
            <MetricCard
              title={metric.title}
              picture_url={metric.picture_url}
              imageClickHandler={() => handleCardClick(metric.metric_id)}
            />
          ))}
        </ul>
      )} 
    </div>
  );
};

export default MetricsListPage;

