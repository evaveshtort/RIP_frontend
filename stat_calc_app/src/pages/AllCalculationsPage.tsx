import React, { useState, useEffect } from "react";
import "./AllCalculationsPage.css";
import BasePage from "./BasePage";
import { ROUTES, ROUTE_LABELS } from "../../Routes.tsx";
import { Spinner } from "react-bootstrap";
import CalculationCard from "../components/CalculationCard.tsx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from '../app/store';
import { getCalculations } from '../app/getCalculations.ts';
import { resetState as resetDataState} from '../features/dataSlice.ts';

interface CalculationMetric {
  calc_id: number;
  creation_date: string;
  formation_date: string | null;
  end_date: string | null;
  creator: string;
  moderator: string | null;
  data_for_calc: string;
}

const AllCalculationsPage: React.FC = () => {
  const [calculations, setCalculations] = useState<CalculationMetric[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [creatorFilter, setCreatorFilter] = useState<string>("");
  const [minDate, setMinDate] = useState<string>("");
  const [maxDate, setMaxDate] = useState<string>("");
  const [uniqueCreators, setCreators] = useState<string[]>([]);

  const { is_staff } = useSelector((state: RootState) => state.auth);
  const data = useSelector((state: RootState) => state.data.all_calc_data);
  const status = useSelector((state: RootState) => state.data.all_calc_status);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
      setLoading(true);
      dispatch(getCalculations({status:statusFilter, dateStart: minDate, dateEnd:maxDate}))
      setLoading(false)
      return () => {
        dispatch(resetDataState())
      };
    }, []);

  useEffect(() => {
    dispatch(getCalculations({status:statusFilter, dateStart: minDate, dateEnd:maxDate}))
  }, [statusFilter, minDate, maxDate]
  )

  useEffect(() => {
      if (status != null) {
        if (status == 200) {
          setCalculations(data[0] || [])
          if (data[0].length > 0) {
            const creators = Array.from(
              new Set(calculations.map((calc) => calc.creator.split("@")[0]))
            );
            setCreators(creators)
          }
        }
        else {
          if (status == 403) {
            navigate(`/forbidden`)
          }
          else {
            if (status == 404) {
              navigate(`/not_found`)
            }
            else { navigate (`/metrics`)}
          }
        }
      }
    }, [status, data])

  useEffect(() => {
    let isActive = true; 

    const pollData = async () => {
      if (!isActive) return;

      dispatch(getCalculations({status:statusFilter, dateStart: minDate, dateEnd:maxDate}))

      setLoading(false);

      if (isActive) {
        setTimeout(pollData, 1000);
      }
    };

    pollData();

    return () => {
      isActive = false;
      dispatch(resetDataState())
    };
  }, [statusFilter, minDate, maxDate, calculations]);


  const handleMinDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinDate(event.target.value);
  };

  const handleMaxDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxDate(event.target.value);
  };


  const handleCreatorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCreatorFilter(event.target.value);
  };

    const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStatus = event.target.value;
    setStatusFilter(selectedStatus);
  };


  return (
    <BasePage
      crumbs={[
        { label: ROUTE_LABELS.HOME, path: ROUTES.HOME },
        { label: ROUTE_LABELS.CALCS, path: ROUTES.CALCS },
      ]}
    >
      <div className="calculations-page">
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
              <div className="headerElem">Кол-во результатов</div>
              <div className="headerElem">Ссылка</div>
            </div>

            <div className="calculation-cards-container">
              {calculations.map((calc) => (
                <CalculationCard
                  calc_id = {calc.calc_id}
                  creator={calc.creator}
                  key={calc.calc_id}
                  data_for_calc={calc.data_for_calc}
                  creation_date={calc.creation_date}
                  formation_date={calc.formation_date}
                  end_date={calc.end_date}
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

