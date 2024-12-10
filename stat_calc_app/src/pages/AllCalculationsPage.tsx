import React, { useState, useEffect } from "react";
import axios from "axios";
import { dest_api } from "../target_config";
import "./AllCalculationsPage.css";
import BasePage from "./BasePage";
import { ROUTES, ROUTE_LABELS } from "../../Routes.tsx";

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
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all calculations and their details
  const fetchCalculationsWithDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${dest_api}/calculations/`);
      const calculations = response.data;

      // Fetch details for each calculation
      const detailedCalculations = await Promise.all(
        calculations.map(async (calc: any) => {
          const detailResponse = await axios.get(`${dest_api}/calculations/${calc.calc_id}/`);
          return {
            ...calc,
            metrics: detailResponse.data.metrics || [], // Метрики, если они есть
          };
        })
      );

      setCalculations(detailedCalculations);
    } catch (err) {
      console.error(err);
      setError("Ошибка загрузки данных");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCalculationsWithDetails();
  }, []);

  return (
    <BasePage crumbs={[{ label: "", path: ROUTES.HOME }, { label: ROUTE_LABELS.CALCS, path: ROUTES.CALCS }]}>
      <div className="calculations-table-page">
        <h1>Список вычислений</h1>
        {error && <p className="error">{error}</p>}
        {loading ? (
          <p>Загрузка...</p>
        ) : (
          <table className="calculations-table">
            <thead>
              <tr>
                <th>Данные для вычисления</th>
                <th>Дата создания</th>
                <th>Дата формирования</th>
                <th>Дата завершения</th>
                <th>Метрика</th>
                <th>Кол-во элементов</th>
                <th>Результат</th>
              </tr>
            </thead>
            <tbody>
              {calculations.flatMap((calc) =>
                calc.metrics.map((metric, index) => (
                  <tr key={`${calc.calc_id}-${index}`}>
                    <td>{calc.data_for_calc}</td>
                    <td>{new Date(calc.creation_date).toLocaleString()}</td>
                    <td>{calc.formation_date ? new Date(calc.formation_date).toLocaleString() : "N/A"}</td>
                    <td>{calc.end_date ? new Date(calc.end_date).toLocaleString() : "N/A"}</td>
                    <td>{metric.title}</td>
                    <td>{metric.amount_of_data}</td>
                    <td>{metric.result !== null ? metric.result : "Результат отсутствует"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </BasePage>
  );
};

export default AllCalculationsPage;

