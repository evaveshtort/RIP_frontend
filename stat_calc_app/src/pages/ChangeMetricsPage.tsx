import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 
import { ROUTES, ROUTE_LABELS } from "../../Routes.tsx";
import BasePage from "./BasePage";
import './ChangeMetricsPage.css';

import { dest_api, dest_minio } from "../target_config";

interface Metric {
  metric_id: number;
  title: string;
  description: string;
  picture_url?: string;
}

function ChangeMetricsPage() {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const navigate = useNavigate(); // Хук для навигации

  // Загружаем все метрики при монтировании компонента
  useEffect(() => {
    axios.get(`${dest_api}/metrics/`)
      .then((response) => {
        const updatedMetrics = response.data.metrics.map((metric: Metric) => {
          // Заменяем в picture_url все вхождения "http://localhost:9000" на dest_minio
          if (metric.picture_url) {
            metric.picture_url = metric.picture_url.replace("http://localhost:9000", dest_minio);
          }
          return metric;
        });
        setMetrics(updatedMetrics);
      })
      .catch((error) => {
        console.error('Error loading metrics:', error);
      });
  }, []);

  // Удалить метрику
  const handleDeleteMetric = (metricId: number) => {
    axios.delete(`${dest_api}/metrics/${metricId}/delete/`)
      .then(() => {
        setMetrics(metrics.filter((metric) => metric.metric_id !== metricId));
      })
      .catch((error) => {
        console.error('Error deleting metric:', error);
      });
  };

  return (
    <BasePage crumbs={[{ label: ROUTE_LABELS.HOME, path: ROUTES.HOME },
      { label: ROUTE_LABELS.CHANGE, path: ROUTES.CHANGE }]}>
      <div className="container">
        {/* Кнопка для добавления новой метрики */}
        <Button className='addBtn' variant="primary" onClick={() => navigate('/metrics_form')}>
          Добавить новую метрику
        </Button>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Картинка</th>
              <th>Название</th>
              <th>Описание</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {metrics.map((metric) => (
              <tr key={metric.metric_id}>
                <td>
                  {metric.picture_url ? (
                    <Image src={metric.picture_url} rounded style={{ width: '100px', height: 'auto' }} />
                  ) : (
                    <></>
                  )}
                </td>
                <td>{metric.title}</td>
                <td>{metric.description}</td>
                <td>
                  {/* Кнопка для редактирования метрики */}
                  <Button variant="warning" style={{ "borderRadius": "20px", "marginBottom": "10px" }} onClick={() => navigate(`/metrics_form/${metric.metric_id}`)}>
                    Редактировать
                  </Button>

                  {/* Кнопка для удаления метрики */}
                  <Button variant="danger" style={{ "borderRadius": "20px", "marginBottom": "10px" }} onClick={() => handleDeleteMetric(metric.metric_id)}>
                    Удалить
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </BasePage>
  );
}

export default ChangeMetricsPage;
