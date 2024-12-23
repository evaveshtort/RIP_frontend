// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { dest_api } from "../target_config";
// import "./AllCalculationsPage.css";
// import BasePage from "./BasePage";
// import { ROUTES, ROUTE_LABELS } from "../../Routes.tsx";
// import { Spinner } from "react-bootstrap";
// import CalculationCard from "../components/CalculationCard.tsx";

// interface MetricDetail {
//   amount_of_data: number;
//   result: string | null;
//   metric_id: number;
//   title: string;
//   description: string;
//   picture_url: string;
// }

// interface CalculationMetric {
//   calc_id: number;
//   creation_date: string;
//   formation_date: string | null;
//   end_date: string | null;
//   creator: string;
//   moderator: string | null;
//   data_for_calc: string;
//   metrics: MetricDetail[];
// }

// const AllCalculationsPage: React.FC = () => {
//   const [calculations, setCalculations] = useState<CalculationMetric[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const [statusFilter, setStatusFilter] = useState<string>("");

//   // Функция для загрузки вычислений с деталями
//   const fetchCalculationsWithDetails = async (status?: string) => {
//     try {
//       const params = status ? { status } : {};
//       const response = await axios.get(`${dest_api}/calculations/`, { params });
//       const calculations = response.data;

//       const detailedCalculations = await Promise.all(
//         calculations.map(async (calc: any) => {
//           const detailResponse = await axios.get(`${dest_api}/calculations/${calc.calc_id}/`);
//           return {
//             ...calc,
//             metrics: detailResponse.data.metrics || [],
//           };
//         })
//       );

//       return detailedCalculations; // Возвращаем данные для последующего сравнения
//     } catch (err) {
//       console.error(err);
//       setError("Ошибка загрузки данных");
//       return []; // Возвращаем пустой массив в случае ошибки
//     }
//   };

//   // Функция для проверки изменений и обновления данных
//   const updateCalculations = (newCalculations: CalculationMetric[]) => {
//     // Проверяем, изменились ли данные
//     if (JSON.stringify(newCalculations) !== JSON.stringify(calculations)) {
//       setCalculations(newCalculations); // Обновляем данные, если они изменились
//     }
//   };

//   // Основная функция polling
//   useEffect(() => {
//     let isActive = true; // Флаг для предотвращения утечек памяти

//     const pollData = async () => {
//       if (!isActive) return;

//       // Устанавливаем флаг загрузки в true только при первом запросе
//       if (calculations.length === 0) {
//         setLoading(true); // Показать анимацию загрузки при первом запросе
//       }

//       // Загружаем новые данные
//       const newCalculations = await fetchCalculationsWithDetails(statusFilter);

//       // Обновляем только если данные изменились
//       if (isActive && JSON.stringify(newCalculations) !== JSON.stringify(calculations)) {
//         updateCalculations(newCalculations); // Обновляем данные, если они изменились
//       }

//       // Скрываем анимацию загрузки, если данные не меняются
//       setLoading(false);

//       // Повторный запрос каждые 5 секунд
//       if (isActive) {
//         setTimeout(pollData, 1000);
//       }
//     };

//     // Запускаем polling
//     pollData();

//     // Возвращаем функцию для остановки polling при размонтировании компонента
//     return () => {
//       isActive = false;
//     };
//   }, [statusFilter, calculations]); // Обновляем, если изменился statusFilter или calculations

//   const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     const selectedStatus = event.target.value;
//     setStatusFilter(selectedStatus);
//   };

//   return (
//     <BasePage
//       crumbs={[
//         { label: ROUTE_LABELS.HOME, path: ROUTES.HOME },
//         { label: ROUTE_LABELS.CALCS, path: ROUTES.CALCS },
//       ]}
//     >
//       <div className="calculations-page">
//         {error && <p className="error">{error}</p>}
//         {loading && (
//           <div className="loadingBg">
//             <Spinner animation="border" />
//           </div>
//         )}
//         {!loading && (
//           <>
//             <div className="custom-select-container">
//               <div className="select-title">Статус вычисления:</div>
//               <button className="custom-select-button">
//                 {statusFilter || "Выберите статус"}
//               </button>
//               <ul className="custom-select-options">
//                 <li
//                   className="custom-select-option"
//                   onClick={() => {
//                     setStatusFilter("");
//                     handleStatusChange({
//                       target: { value: "" },
//                     } as React.ChangeEvent<HTMLSelectElement>);
//                   }}
//                 >
//                   Все
//                 </li>
//                 <li
//                   className="custom-select-option"
//                   onClick={() => {
//                     setStatusFilter("завершен");
//                     handleStatusChange({
//                       target: { value: "завершен" },
//                     } as React.ChangeEvent<HTMLSelectElement>);
//                   }}
//                 >
//                   Завершен
//                 </li>
//                 <li
//                   className="custom-select-option"
//                   onClick={() => {
//                     setStatusFilter("сформирован");
//                     handleStatusChange({
//                       target: { value: "сформирован" },
//                     } as React.ChangeEvent<HTMLSelectElement>);
//                   }}
//                 >
//                   Сформирован
//                 </li>
//               </ul>
//             </div>

//             <div className="calculation-card-header">
//               <div className="headerElem">Автор</div>
//               <div className="headerElem">Данные для вычисления</div>
//               <div className="headerElem">Дата создания</div>
//               <div className="headerElem">Дата формирования</div>
//               <div className="headerElem">Дата завершения</div>
//               <div className="headerElem">Метрика</div>
//               <div className="headerElem">Кол-во элементов</div>
//               <div className="headerElem">Результат</div>
//             </div>

//             <div className="calculation-cards-container">
//               {calculations.map((calc) => (
//                 <CalculationCard
//                   creator={calc.creator}
//                   key={calc.calc_id}
//                   calc_id={calc.calc_id}
//                   data_for_calc={calc.data_for_calc}
//                   creation_date={calc.creation_date}
//                   formation_date={calc.formation_date}
//                   end_date={calc.end_date}
//                   metrics={calc.metrics}
//                 />
//               ))}
//             </div>
//           </>
//         )}
//       </div>
//     </BasePage>
//   );
// };

// export default AllCalculationsPage;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { dest_api } from "../target_config";
import "./AllCalculationsPage.css";
import BasePage from "./BasePage";
import { ROUTES, ROUTE_LABELS } from "../../Routes.tsx";
import { Spinner } from "react-bootstrap";
import CalculationCard from "../components/CalculationCard.tsx";
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

interface MetricDetail {
  amount_of_data: number;
  result: string | null;
  metric_id: number;
  title: string;
  description: string;
  picture_url: string;
}

interface CalculationMetric {
  calc_id: number;
  creation_date: string;
  formation_date: string | null;
  end_date: string | null;
  creator: string;
  moderator: string | null;
  data_for_calc: string;
  metrics: MetricDetail[];
}

const AllCalculationsPage: React.FC = () => {
  const [calculations, setCalculations] = useState<CalculationMetric[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [creatorFilter, setCreatorFilter] = useState<string>("");
  const [minDate, setMinDate] = useState<string>("");
  const [maxDate, setMaxDate] = useState<string>("");

  const { is_staff } = useSelector((state: RootState) => state.auth);

  // Функция для загрузки вычислений с деталями
  const fetchCalculationsWithDetails = async () => {
    try {
      const params: any = {};
      if (statusFilter) params.status = statusFilter;
      if (minDate) params.dateStart = minDate;
      if (maxDate) params.dateEnd = maxDate;

      const response = await axios.get(`${dest_api}/calculations/`, { params });
      const calculations = response.data;

      const detailedCalculations = await Promise.all(
        calculations.map(async (calc: any) => {
          const detailResponse = await axios.get(`${dest_api}/calculations/${calc.calc_id}/`);
          return {
            ...calc,
            metrics: detailResponse.data.metrics || [],
          };
        })
      );

      return detailedCalculations; // Возвращаем данные для последующего сравнения
    } catch (err) {
      console.error(err);
      setError("Ошибка загрузки данных");
      return []; // Возвращаем пустой массив в случае ошибки
    }
  };

  // Функция для проверки изменений и обновления данных
  const updateCalculations = (newCalculations: CalculationMetric[]) => {
    if (JSON.stringify(newCalculations) !== JSON.stringify(calculations)) {
      setCalculations(newCalculations);
    }
  };




  useEffect(() => {
    let isActive = true; 

    const pollData = async () => {
      if (!isActive) return;


      const newCalculations = await fetchCalculationsWithDetails();
      if (isActive && JSON.stringify(newCalculations) !== JSON.stringify(calculations)) {
        updateCalculations(newCalculations);
      }

      setLoading(false);

      if (isActive) {
        setTimeout(pollData, 1000);
      }
    };

    pollData();

    return () => {
      isActive = false;
    };
  }, [statusFilter, minDate, maxDate, calculations]);

  // Обработчики изменения даты
  const handleMinDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinDate(event.target.value);
  };

  const handleMaxDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxDate(event.target.value);
  };

  // Обработчик изменения выбора creator
  const handleCreatorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCreatorFilter(event.target.value);
  };

    const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStatus = event.target.value;
    setStatusFilter(selectedStatus);
  };

  // Извлекаем уникальные значения для creator
  const uniqueCreators = Array.from(
    new Set(calculations.map((calc) => calc.creator.split("@")[0]))
  );

  return (
    <BasePage
      crumbs={[
        { label: ROUTE_LABELS.HOME, path: ROUTES.HOME },
        { label: ROUTE_LABELS.CALCS, path: ROUTES.CALCS },
      ]}
    >
      <div className="calculations-page">
        {error && <p className="error">{error}</p>}
        {loading && (
          <div className="loadingBg">
            <Spinner animation="border" />
          </div>
        )}
        {!loading && (
          <>
            <div className="filters">
            <div className="custom-select-container">
               <div className="select-title">Статус вычисления:</div>
               <button className="custom-select-button">
                 {statusFilter || "Выберите статус"}
               </button>
               <ul className="custom-select-options">
                 <li
                  className="custom-select-option"
                  onClick={() => {
                    setStatusFilter("");
                    handleStatusChange({
                      target: { value: "" },
                    } as React.ChangeEvent<HTMLSelectElement>);
                  }}
                >
                  Все
                </li>
                <li
                  className="custom-select-option"
                  onClick={() => {
                    setStatusFilter("завершен");
                    handleStatusChange({
                      target: { value: "завершен" },
                    } as React.ChangeEvent<HTMLSelectElement>);
                  }}
                >
                  Завершен
                </li>
                <li
                  className="custom-select-option"
                  onClick={() => {
                    setStatusFilter("сформирован");
                    handleStatusChange({
                      target: { value: "сформирован" },
                    } as React.ChangeEvent<HTMLSelectElement>);
                  }}
                >
                  Сформирован
                </li>
              </ul>
            </div>
              { is_staff && (
                <div style = {{"display":"flex", "flexDirection": "row", "justifyContent": "space-between", "width": "100%", "paddingLeft": "50px", "paddingRight":"50px"}}>
              <div className="filter-group">
                <label>Автор:</label>
                <select onChange={handleCreatorChange} value={creatorFilter}>
                  <option value="">Все</option>
                  {uniqueCreators.map((creator) => (
                    <option key={creator} value={creator}>
                      {creator}
                    </option>
                  ))}
                </select>
              </div>
              <div className="filter-group">
                <label style = {{"width":"150px"}}>Минимальная дата:</label>
                <input
                  type="date"
                  value={minDate}
                  onChange={handleMinDateChange}
                  max={maxDate || undefined}
                />
              </div>
              <div className="filter-group">
                <label style = {{"width":"150px"}}>Максимальная дата:</label>
                <input
                  type="date"
                  value={maxDate}
                  onChange={handleMaxDateChange}
                  min={minDate || undefined}
                />
              </div>
            </div>
          )}
          </div>

            <div className="calculation-card-header">
              <div className="headerElem">Автор</div>
              <div className="headerElem">Данные для вычисления</div>
              <div className="headerElem">Дата создания</div>
              <div className="headerElem">Дата формирования</div>
              <div className="headerElem">Дата завершения</div>
              <div className="headerElem">Метрика</div>
              <div className="headerElem">Кол-во элементов</div>
              <div className="headerElem">Результат</div>
            </div>

            <div className="calculation-cards-container">
              {calculations.map((calc) => (
                <CalculationCard
                  creator={calc.creator}
                  key={calc.calc_id}
                  calc_id={calc.calc_id}
                  data_for_calc={calc.data_for_calc}
                  creation_date={calc.creation_date}
                  formation_date={calc.formation_date}
                  end_date={calc.end_date}
                  metrics={calc.metrics}
                  filter_creator={creatorFilter} />
              ))}
            </div>
          </>
        )}
      </div>
    </BasePage>
  );
};

export default AllCalculationsPage;

