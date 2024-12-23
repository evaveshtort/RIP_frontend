import React from "react";
import "./CalculationCard.css"
import { dest_minio } from "../target_config"
import image from "./reset1.png";
import image2 from "./set.png";
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import axios from 'axios';
import { dest_api } from "../target_config"


interface Metric {
  picture_url: string;
  title: string;
  amount_of_data: number;
  result: string | null;
}

interface CalculationCardProps {
  calc_id: number;
  data_for_calc: string;
  creation_date: string;
  formation_date?: string | null;
  end_date?: string | null;
  metrics: Metric[];
  creator: string;
  filter_creator: string;
}

const onReset = async (calc_id: number) => {
    try {
    const response = await axios.put(dest_api + '/calculations/'+calc_id+'/update_status_admin/', 
        {"status":"отклонен"})
    if (response.status = 200) {
        console.log('Статус обновлен');
    }
    }catch (error: any) {
    console.log('Ошибка обновления статуса');
  }
};

const onSet = async (calc_id: number) => {
    try {
        const response = await axios.put(dest_api + '/calculations/'+calc_id+'/update_status_admin/', 
            {"status":"завершен"})
        if (response.status = 200) {
            console.log('Статус обновлен');
        }
        }catch (error: any) {
        console.log('Ошибка обновления статуса');
      }
};

const CalculationCard: React.FC<CalculationCardProps> = ({
  calc_id,
  data_for_calc,
  creation_date,
  formation_date,
  end_date,
  metrics,
  creator,
  filter_creator
}) => {
  const { is_staff } = useSelector((state: RootState) => state.auth);
  return (
    <div>
    { (filter_creator == null || filter_creator == creator.split('@')[0] || filter_creator == "") && (
    <div className="calculation-card">
        { (is_staff && end_date == null) && (
        <div className="buttons">
         <img src={image} style={{"height":"25px"}} onClick={() => onReset(calc_id)} />
         <img src={image2} style={{"height":"25px"}} onClick={() => onSet(calc_id)} />
         </div>)
       }
    <div className="calculation-card-rows-metrics">
        {metrics.map((metric, index) => (
        <div key={index} className="calculation-card-row-metric">
      { !(is_staff && end_date == null) && (<img src={metric.picture_url.replace("http://localhost:9000", dest_minio)} alt="card" style={{ height: "80%"}} />)}
      <div className ="calculation-card-row">
        {creator.split('@')[0]}
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
            {metric.title}
          </div>
          <div className="calculation-card-row">
            {metric.amount_of_data}
          </div>
          <div className="calculation-card-row">
            {metric.result ?? ""}
          </div>
        </div>
      ))}
      </div>
    </div>
    )}
    </div>
  );
};

export default CalculationCard;
