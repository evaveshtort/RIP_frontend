import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';  // Хук useParams для получения ID из URL
import { Button, Form } from 'react-bootstrap';
import { dest_api, dest_minio } from "../target_config";
import BasePage from "./BasePage";
import { ROUTES, ROUTE_LABELS } from "../../Routes.tsx";

interface Metric {
  metric_id: number;
  title: string;
  description: string;
  picture_url?: string;
  metric_code: string;
}

function MetricFormPage() {
  const { metricId } = useParams<{ metricId: string }>();  // Получаем ID из URL
  const [metric, setMetric] = useState<Metric | null>(null);
  const [newMetric, setNewMetric] = useState({ title: '', description: '', metric_code: '' });
  const [titleError, setTitleError] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);  // Для загрузки картинки
  const navigate = useNavigate();

  useEffect(() => {
    if (metricId) {
      fetch(`${dest_api}/metrics/${metricId}/`)
        .then((response) => response.json())
        .then((data) => {
          if (data.picture_url) {
            data.picture_url = data.picture_url.replace("http://localhost:9000", dest_minio);
          }
          setMetric(data);
          setNewMetric({ title: data.title, description: data.description, metric_code: data.metric_code });
        })
        .catch((error) => {
          console.error('Error loading metric details:', error);
        });
    }
  }, [metricId]); 

  const handleSaveChanges = () => {
    if (!newMetric.title.trim()) {
      setTitleError(true);
      return;
    }

    const requestBody = { title: newMetric.title, description: newMetric.description, metric_code: newMetric.metric_code };


    fetch(`${dest_api}/metrics/${metric?.metric_id}/update/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then(() => {
        if (imageFile) {
          const formData = new FormData();
          formData.append('pic', imageFile);

          fetch(`${dest_api}/metrics/${metric?.metric_id}/add_picture/`, {
            method: 'POST',
            body: formData,
          })
            .then((response) => response.json())
            .then(() => {
            })
            .catch((error) => {
              console.error('Error adding picture to metric:', error);
            });
        }
        navigate('/metrics_change');  
      })
      .catch((error) => {
        console.error('Error editing metric:', error);
      });
  };


  const handleAddNewMetric = () => {
    if (!newMetric.title.trim()) {
      setTitleError(true);
      return;
    }

    const requestBody = { title: newMetric.title, description: newMetric.description };


    fetch(`${dest_api}/metrics/create/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        const metricId = data.metric_id;
        
        if (imageFile) {
          const formData = new FormData();
          formData.append('pic', imageFile);

          fetch(`${dest_api}/metrics/${metricId}/add_picture/`, {
            method: 'POST',
            body: formData,
          })
            .then((response) => response.json())
            .then(() => {  
            })
            .catch((error) => {
              console.error('Error adding picture to new metric:', error);
            });
        } 
        navigate('/metrics_change');
      })
      .catch((error) => {
        console.error('Error adding new metric:', error);
      });
  };


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  return (
    <BasePage crumbs={[{ label: ROUTE_LABELS.HOME, path: ROUTES.HOME },
        { label: ROUTE_LABELS.CHANGE, path: ROUTES.CHANGE },
        { label: ROUTE_LABELS.METRIC_FORM, path: ROUTES.METRIC_FORM }]}>
    <div className="container">
      <h2>{metricId ? `Редактировать метрику: ${metric?.title}` : 'Добавить новую метрику'}</h2>

      <Form>
        <Form.Group controlId="metricTitle">
          <Form.Label>Название</Form.Label>
          <Form.Control
            type="text"
            value={newMetric.title}
            onChange={(e) => setNewMetric({ ...newMetric, title: e.target.value })}
            style={titleError ? { borderColor: 'red' } : {}}
          />
        </Form.Group>

        <Form.Group controlId="metricDescription">
          <Form.Label>Описание</Form.Label>
          <Form.Control
            type="text"
            value={newMetric.description}
            onChange={(e) => setNewMetric({ ...newMetric, description: e.target.value })}
          />
        </Form.Group>

        <Form.Group controlId="metricCode">
          <Form.Label>Код</Form.Label>
          <Form.Control
            type="text"
            value={newMetric.metric_code}
            onChange={(e) => setNewMetric({ ...newMetric, metric_code: e.target.value })}
          />
        </Form.Group>

        <Form.Group controlId="metricImage">
          <Form.Label>Картинка</Form.Label>
          <Form.Control
            type="file"
            onChange={handleImageChange}
          />
        </Form.Group>

        <Button
          variant="primary"
          onClick={metricId ? handleSaveChanges : handleAddNewMetric}
        >
          {metricId ? 'Сохранить изменения' : 'Добавить метрику'}
        </Button>
      </Form>
    </div>
    </BasePage>
  );
}

export default MetricFormPage;





