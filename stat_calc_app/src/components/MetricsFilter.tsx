import React from "react";
import InputField from "./InputField";

interface MetricFilterProps {
  value: string;
  setValue: (value: string) => void;
  loading: boolean;
  onSubmit: () => void;
  resetFlag: boolean;
  onReset: () => void;
}

const MetricFilter: React.FC<MetricFilterProps> = ({
  value,
  onReset,
  onSubmit,
  loading,
  resetFlag,
  setValue
}) => {
  return (
    <div className="searchForm">
      <InputField
        value={value}
        setValue={setValue}
        loading={loading}
        onSubmit={onSubmit}
        placeholder="Название метрики"
      />
      
      {resetFlag && (
        <img
          src="http://localhost:9000/items/reset.png"
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






