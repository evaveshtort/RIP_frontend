import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { dest_minio, dest_api } from "../target_config"
import './CalcItem.css';
import axios from 'axios';
import { cntMetricsSet, draftCalcIdSet, draftCalcSet } from "../features/calcSlice.ts";
import { useDispatch, UseDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { resetState as resetCalcState } from '../features/calcSlice';

interface CalcItemProps {
  id: string;
  pictureUrl: string;
  title: string;
  amountOfData: number;
  onUpdate: (id: string, newAmount: number) => void;
  calc_id: string;
  fetchData: () => void;
}

export const CalcItem: React.FC<CalcItemProps> = ({ id, pictureUrl, title, amountOfData, onUpdate, calc_id, fetchData }) => {

  const cntMetrics = useSelector((state: RootState) => state.calc.cntMetrics);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    onUpdate(id, value);
  };

  const delClickHandler = async (calc_id: string, metric_id:string) => {
    const response = await axios.delete(dest_api + '/calculations/' + calc_id + '/delete_metric/' + metric_id + '/')
    if (response.status == 200){
        const new_cnt = cntMetrics - 1
        if (new_cnt == 0) {
            dispatch(resetCalcState())
            navigate(`/metrics`)
        }
        else{fetchData()}
    }
  };


  return (
    <div className="flex_container_cart">
      <img src={pictureUrl.replace("http://localhost:9000", dest_minio)} alt="card" style={{ height: "150px" }} />
      <div className="calcItem">
        <h4>
          <b><Link to={`/metrics/${id}`} className="card-title">{title}</Link></b>
        </h4>
        <div className="numberOfElems">
          <p>Количество элементов для расчета:</p>
          <input
            className="numberFrame"
            type="number"
            defaultValue={amountOfData}
            onChange={handleChange}
          />
        </div>
        <Link to={`/metrics/${id}`} className="card-link">
          Узнать больше &#8594;
        </Link>
        <Button
        className="card-link-del"
        onClick={() => delClickHandler(calc_id, id)}
        >
        Удалить из вычисления &#8594;
        </Button>
      </div>
    </div>
  );
};
