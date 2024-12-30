import React, { useState, useEffect } from "react";
import "./CalculationCard.css"
import image from "./reset1.png";
import image2 from "./set.png";
import { useSelector,  useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import axios from 'axios';
import { dest_api } from "../target_config"
import { Link } from "react-router-dom";
import { setReset } from '../app/setReset.ts';

interface Metric {
  metric_id: number;
  amount_of_data: number;
  result: number;
  description: string;
  pictureUrl: string;
  title: string;
}

interface CalculationCardProps {
  key: number;
  calc_id: number;
  data_for_calc: string;
  creation_date: string;
  formation_date?: string | null;
  end_date?: string | null;
  creator: string;
  filter_creator: string;
}


const CalculationCard: React.FC<CalculationCardProps> = ({
  calc_id,
  data_for_calc,
  creation_date,
  formation_date,
  end_date,
  creator,
  filter_creator
}) => {
  const { is_staff } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const onSetReset = async (calc_id: number, status:string) => {
      dispatch(setReset({calc_id:calc_id, status:status}))
  };

  const [cnt_metrics, setCnt] = useState<number>(0);
  useEffect(() => {
    if (calc_id != null){
    const fetchMetrics = async () => {
      try {
        const response = await axios.get(dest_api + '/calculations/' + calc_id + '/');
        if (response.status === 200) {
          setCnt(response.data.metrics.filter((metric: Metric) => metric.result != null).length);
        }
      } catch (error: any) {
        console.log('Ошибка при получении метрик:', error.message || error);
      }
    };
    fetchMetrics();
  };
  }, [calc_id]);
  
  return (
    <div>
    {(filter_creator == null || (creator && creator.split('@')[0] === filter_creator) || filter_creator === "") && (
  <div className="calculation-card">
    {(is_staff && !end_date) ? (
      <div className="buttons">
        <img src={image} style={{ height: "25px" }} onClick={() => onSetReset(calc_id, "отклонен")} />
        <img src={image2} style={{ height: "25px" }} onClick={() => onSetReset(calc_id, "завершен")} />
      </div>
    ):
    (<div className="buttons"></div>)}
    <div className="calculation-card-row">
      {creator ? creator.split('@')[0] : "Неизвестный автор"}
    </div>
    <div className="calculation-card-row">
      {data_for_calc}
    </div>
    <div className="calculation-card-row">
      {new Date(creation_date).toLocaleDateString()}
    </div>
    <div className="calculation-card-row">
      {formation_date ? new Date(formation_date).toLocaleDateString() : ""}
    </div>
    <div className="calculation-card-row">
      {end_date ? new Date(end_date).toLocaleDateString() : ""}
    </div>
    <div className="calculation-card-row">
    {cnt_metrics}
    </div>
    <div className="calculation-card-row">
    <Link to={`/calculation/${calc_id}`} className="calc-link">
                  Вычисление &#8594;
                </Link>
    </div>
  </div>
)}

    </div>
  );
};

export default CalculationCard;
