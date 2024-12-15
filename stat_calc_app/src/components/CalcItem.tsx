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
    <div className="flex_container_calc">
        <div className="imgTitle">
          <img src={pictureUrl.replace("http://localhost:9000", dest_minio)} alt="card" style={{ height: "90%"}} />
          
          <h4>
            <div className="calc-title">{title}</div>
          </h4>
        </div>
        <div className="numbLinks">
          <div>
          <div className="numberOfElems">
            <div className="customText">Количество элементов для расчета:</div>
            <input
              className="numberFrame"
              type="number"
              defaultValue={amountOfData}
              onChange={handleChange}
            />
          </div>
          <div className="customText">Результат: будет доступен после завершения</div>
          </div>
          <div className="links">
          <Link to={`/metrics/${id}`} className="calc-link">
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
      </div>
  );
};
