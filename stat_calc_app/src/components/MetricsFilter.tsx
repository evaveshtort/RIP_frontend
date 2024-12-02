import React from "react";
import InputField from "./InputField";
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import image from "../components/reset.png";


interface MetricFilterProps {
  value: string;
  setValue: (value: string) => void;
  loading: boolean;
  onSubmit: () => void;
  onReset: () => void;
}

const MetricFilter: React.FC<MetricFilterProps> = ({
  value,
  onReset,
  onSubmit,
  loading,
  setValue
}) => {
  const { shouldFilter } = useSelector((state: RootState) => state.metricsFilter);
  return (
    <div className="searchForm">
      <InputField
        value={value}
        setValue={setValue}
        loading={loading}
        onSubmit={onSubmit}
        placeholder="Название метрики"
      />
      
      {shouldFilter && (
        <img
          src= {image}
          style={{
            width: "35px",
            cursor: "pointer",
            position: "relative",
            zIndex: 1,
          }}
          onClick={onReset}
          alt="Reset"
        />
      )}
    </div>
  );
};

export default MetricFilter;






