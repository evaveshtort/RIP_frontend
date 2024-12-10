import React, { useState, useEffect } from "react";
import { CalcItem } from "../components/CalcItem";
import BasePage from "./BasePage";
import "./CalculationPage.css";
import { ROUTES, ROUTE_LABELS } from "../../Routes.tsx";
import { useParams, useNavigate } from "react-router-dom";
import { api } from '../api';
import axios from 'axios';
import { dest_api } from "../target_config";
import { cntMetricsSet, resetState as resetCalcState } from '../features/calcSlice';
import { useDispatch } from "react-redux";

interface Metric {
  id: string;
  title: string;
  pictureUrl: string;
  amountOfData: number;
}

export const CalculationPage: React.FC = () => {
  const { calc_id } = useParams();
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [calcData, setCalcData] = useState("");
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleUpdateMetric = async (id: string, newAmount: number) => {
    setMetrics((prev) =>
      prev.map((metric) => (metric.id === id ? { ...metric, amountOfData: newAmount } : metric))
    );
  
    try {
      const response = await axios.put(
        `${dest_api}/calculations/${calc_id}/update_metric/${id}/`,
        { amount_of_data: newAmount }
      );
      if (response.status === 200) {
        console.log("Количество успешно обновлено");
      }
    } catch (error) {
      setError("Ошибка обновления метрики");
      console.error(error);
    }
  };
  

  const handleDeleteCalculations = async (calc_id:string) => {
    try {
      const response = await axios.delete( dest_api + '/calculations/' + calc_id + '/delete/');
      if (response.status = 200) {
        dispatch(resetCalcState())
        navigate(`/metrics`)
      }
    } catch (error: any) {
      setError('Ошибка удаления');
    }
  };

  const handleChangeCalcData = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      try {
        const response = await axios.put(
          `${dest_api}/calculations/${calc_id}/update/`,
          { data_for_calc: calcData }
        );
        if (response.status === 200) {
          console.log("Данные обновлены");
        }
      } catch (error) {
        setError("Ошибка отправки данных");
        console.error(error);
      }
    }
  };
  

  const fetchData = async (calc_id:string) => {
    try {
      const response = await axios.get( dest_api + '/calculations/' + calc_id + '/');
      if (response.status = 200) {
        const metrics = response.data.metrics.map((metric: any) => ({
          id: metric.metric_id,
          title: metric.title,
          pictureUrl: metric.picture_url,
          amountOfData: metric.amount_of_data,
        }));
        console.log(metrics)
        setMetrics(metrics);
        setCalcData(response.data.data_for_calc);
        if (metrics.length === 0) {
          dispatch(resetCalcState())
          navigate(`/metrics`);
        }
        else {
          dispatch(cntMetricsSet(metrics.length))
        }
      }
    } catch (error: any) {
      navigate(`/metrics`);
      setError('Ошибка получения данных');
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData(calc_id??'-1')
    setLoading(false)
  }, []);

  return (
    <BasePage crumbs={[{ label: "", path: ROUTES.HOME },
      { label: ROUTE_LABELS.CALC, path: ROUTES.CALC }]}>
      <div className="upper_calc_list">
        <div className="change_data">
          <input
            className="inputFrame"
            type="text"
            value={calcData}
            onChange={(e) => setCalcData(e.target.value)}
            onKeyDown={handleChangeCalcData}
            placeholder="Введите данные для расчёта через пробел:"
          />
        </div>
        <button className="delBtn" onClick={() => handleDeleteCalculations(calc_id??'-1')}>
          Удалить
        </button>
      </div>

      <div className="calc_list">
        {metrics.map((metric) => (
          <CalcItem
            key={metric.id}
            id={metric.id}
            pictureUrl={metric.pictureUrl}
            title={metric.title}
            amountOfData={metric.amountOfData}
            onUpdate={handleUpdateMetric}
            calc_id={calc_id??'-1'}
            fetchData={() => fetchData(calc_id ?? '-1')}
          />
        ))}
      </div>
    </BasePage>
  );
};

