import React, { useState, useEffect } from "react";
import { CalcItem } from "../components/CalcItem";
import BasePage from "./BasePage";
import "./CalculationPage.css";
import { Spinner } from 'react-bootstrap';
import { ROUTES, ROUTE_LABELS } from "../../Routes.tsx";
import { useParams, useNavigate } from "react-router-dom";
import { cntMetricsSet, resetState as resetCalcState } from '../features/calcSlice';
import { resetState as resetDataState} from '../features/dataSlice.ts';
import { useDispatch, useSelector } from "react-redux";
import {Tooltip as ReactTooltip } from 'react-tooltip';
import { getCalculationById } from '../app/getCalculationById.ts';
import { updateCalculation } from '../app/updateCalculation.ts';
import { deleteCalculation } from '../app/deleteCalculation.ts';
import { sendCalculation } from '../app/sendCalculation.ts';
import { updateCalcMetric } from '../app/updateCalcMetric.ts';
import { AppDispatch, RootState } from '../app/store';

interface Metric {
  id: string;
  title: string;
  pictureUrl: string;
  amountOfData: number;
  result: number;
}


export const CalculationPage: React.FC = () => {
  const Tooltip: typeof ReactTooltip = ReactTooltip;
  const { calc_id } = useParams();
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [calcData, setCalcData] = useState("");
  const [formated, setFormated] = useState<boolean>(false);
  const [withCalc, setWithCalc] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const data = useSelector((state: RootState) => state.data.data);
  const status = useSelector((state: RootState) => state.data.status);

  const handleUpdateMetric = async (id: string, newAmount: number) => {
    const c_id = calc_id ?? "-1"
    dispatch(updateCalcMetric({calc_id:c_id, metric_id:id, amount_of_data:newAmount}))
  };
  

  const handleDeleteCalculations = async () => {
    const id = calc_id ?? "-1"
    dispatch(deleteCalculation(id))
    navigate(`/metrics`)
  };

  const handleChangeCalcData = async () => {
    const id = calc_id ?? "-1"
    dispatch(updateCalculation({calc_id:id, data_for_calc:calcData}))
    if (calcData == "" || calcData == null) {
      setWithCalc(false)
    }
    else{
      setWithCalc(true)
    }
  };

  const handleSend = async () => {
    const id = calc_id ?? "-1"
    dispatch(sendCalculation(id))
    navigate(`/metrics`)
  };

  useEffect(() => {
    setLoading(true);
    const id = calc_id ?? "-1"
    dispatch(getCalculationById(id))
    setLoading(false)
    return () => {
      dispatch(resetDataState())
    };
  }, []);

  useEffect(() => {
    if (status != null) {
      if (status == 200) {
        const metrics = data[0].metrics.map((metric: any) => ({
          id: metric.metric_id,
          title: metric.title,
          pictureUrl: metric.picture_url,
          amountOfData: metric.amount_of_data,
          result: metric.result
        }));
        if (data[0].formation_date != null) {
          setFormated(true)
        }
        else {
          setFormated(false)
        }
        setMetrics(metrics || [])
        setCalcData(data[0].data_for_calc);
        if (data[0].data_for_calc == "" || data[0].data_for_calc == null) {
          setWithCalc(false)
        }
        else{
          setWithCalc(true)
        }
        if (metrics.length === 0) {
          dispatch(resetCalcState())
          navigate(`/metrics`);
        }
        else {
          dispatch(cntMetricsSet(metrics.length))
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

  return (
    <BasePage crumbs={[{ label: ROUTE_LABELS.HOME, path: ROUTES.HOME },
      { label: ROUTE_LABELS.CALCS, path: ROUTES.CALCS },
      { label: ROUTE_LABELS.CALC, path: ROUTES.CALC }]}>
      <div className="upper_calc_list">
        <div className="change_data">
          <input
            className="inputFrame"
            type="text"
            value={calcData}
            onChange={(e) => setCalcData(e.target.value)}
            placeholder="Введите данные для расчёта через пробел:"
            data-tooltip-id="my-tooltip" 
            data-tooltip-content="Данные для вычислений, вводить нужно через пробел"
            disabled={formated}
          />
          <Tooltip 
            id="my-tooltip" 
            className="custom-tooltip" 
            place="bottom" 
            style={{ fontFamily: 'monospace', borderRadius: '20px', backgroundColor: '#910ed8'}} 
          />
        </div>
        {!formated ? (
          <div className="buttons_calc">
            <button className="customBtn" onClick={handleChangeCalcData}>Сохранить</button>
            {withCalc ? (<button className="customBtn" onClick={handleSend}>Сформировать</button>):(<></>)}
            <button className="customBtn" onClick={() => handleDeleteCalculations()}>
              Удалить
            </button>
            </div>
        ):(<></>)}
      </div>
      {loading ? (
        <div className="loadingBg">
          <Spinner animation="border" />
        </div>
      ):
      (<div className="calc_list">
        {metrics.map((metric) => (
          <CalcItem
            key={metric.id}
            id={metric.id}
            pictureUrl={metric.pictureUrl}
            title={metric.title}
            amountOfData={metric.amountOfData}
            onUpdate={handleUpdateMetric}
            calc_id={calc_id??'-1'}
            result={metric.result}
            fetchData={() => dispatch(getCalculationById(calc_id ?? "-1"))}
            formated={formated}
          />
        ))}
      </div>)}
    </BasePage>
  );
};

