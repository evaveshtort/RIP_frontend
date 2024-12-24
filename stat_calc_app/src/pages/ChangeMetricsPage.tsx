import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Image } from 'react-bootstrap';
import { ROUTES, ROUTE_LABELS } from "../../Routes.tsx";
import BasePage from "./BasePage";
import './ChangeMetricsPage.css'

import { dest_api, dest_minio } from "../target_config"

interface Metric {
    metric_id: number;
    title: string;
    description: string;
    picture_url?: string;
  }
  
  function ChangeMetricsPage() {
    const [metrics, setMetrics] = useState<Metric[]>([]); // Типизируем состояние как массив метрик
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showPictureModal, setShowPictureModal] = useState(false);
    const [metricToEdit, setMetricToEdit] = useState<Metric | null>(null);
    const [newMetric, setNewMetric] = useState({ title: '', description: '' });
    const [picFile, setPicFile] = useState<File | null>(null);
    const [titleError, setTitleError] = useState(false);
  
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
          setMetrics(updatedMetrics); // Обновляем состояние с заменой URL
        })
        .catch((error) => {
          console.error('Error loading metrics:', error);
        });
    }, []);
  
    // Добавить новую метрику с использованием fetch
    const handleAddMetric = () => {
      if (!newMetric.title.trim()) {
        setTitleError(true);
        return;
      }
      let req;
      if(newMetric.description === '') {
        req = {title: newMetric.title}
      }
      else {
        req = newMetric
      }
      fetch(`${dest_api}/metrics/create/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Ошибка при добавлении метрики');
          }
        })
        .then((data) => {
          setMetrics((prevMetrics) => [...prevMetrics, data]); // Добавляем метрику в массив
          setShowAddModal(false);
        })
        .catch((error) => {
          console.error('Error adding metric:', error);
        });
    };
  
    // Редактировать метрику
    const handleEditMetric = () => {
      if (!metricToEdit) return; // Если нет метрики для редактирования, ничего не делаем

      let req;
      if(newMetric.description === '' && newMetric.title === '') {
        req = null
      }
      else {
      if(newMetric.description === '') {
        req = {title: newMetric.title}
      }

      else {
        if(newMetric.title === ''){
            req = {title: newMetric.description}
        }
        else{ req = newMetric}
      }
  
      axios.put(`${dest_api}/metrics/${metricToEdit.metric_id}/update/`, newMetric)
        .then((response) => {
          const updatedMetrics = metrics.map((metric) =>
            metric.metric_id === metricToEdit.metric_id ? response.data : metric
          );
          setMetrics(updatedMetrics);
          setShowEditModal(false);
        })
        .catch((error) => {
          console.error('Error updating metric:', error);
        });
    }
    };
  
    // Добавить картинку к метрике
    const handleAddPicture = () => {
      if (!picFile || !metricToEdit) return; // Если нет файла или метрики, ничего не делаем
  
      const formData = new FormData();
      formData.append('pic', picFile);
  
      axios.post(`${dest_api}/metrics/${metricToEdit.metric_id}/add_picture/`, formData)
        .then(() => {
          // Обновляем картинку в метрике
          const updatedMetrics = metrics.map((metric) =>
            metric.metric_id === metricToEdit.metric_id ? { ...metric, picture_url: URL.createObjectURL(picFile) } : metric
          );
          setMetrics(updatedMetrics);
          setShowPictureModal(false);
        })
        .catch((error) => {
          console.error('Error adding picture:', error);
        });
    };
  
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
  
    // Обработчик выбора файла
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files ? e.target.files[0] : null;
      setPicFile(file);
    };
  
    return (
    <BasePage crumbs={[{ label: ROUTE_LABELS.HOME, path: ROUTES.HOME },
        { label: ROUTE_LABELS.CALC, path: ROUTES.CALC }]}>
      <div className="container" >
        <Button className='addBtn' variant="primary" onClick={() => setShowAddModal(true)}>Добавить новую метрику</Button>
        
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
                    <Button variant="info" onClick={() => { setMetricToEdit(metric); setShowPictureModal(true); }}>
                      Добавить картинку
                    </Button>
                  )}
                </td>
                <td>{metric.title}</td>
                <td>{metric.description}</td>
                <td>
                  <Button variant="warning" style = {{"borderRadius":"20px", "marginBottom": "10px"}} onClick={() => { setMetricToEdit(metric); setShowEditModal(true); }}>Редактировать</Button>
                  <Button variant="danger" style = {{"borderRadius":"20px", "marginBottom": "10px"}} onClick={() => handleDeleteMetric(metric.metric_id)}>Удалить</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
  
        {/* Модальное окно для добавления метрики */}
        <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Добавить новую метрику</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="metricTitle">
                <Form.Label>Название</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Введите название"
                  value={newMetric.title}
                  onChange={(e) => setNewMetric({ ...newMetric, title: e.target.value })}
                  style={titleError ? { borderColor: 'red' } : {}}
                />
              </Form.Group>
              <Form.Group controlId="metricDescription">
                <Form.Label>Описание</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Введите описание"
                  value={newMetric.description}
                  onChange={(e) => setNewMetric({ ...newMetric, description: e.target.value })}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>Закрыть</Button>
            <Button variant="primary" onClick={handleAddMetric}>Добавить</Button>
          </Modal.Footer>
        </Modal>
  
        {/* Модальное окно для редактирования метрики */}
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Редактировать метрику</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="metricTitle">
                <Form.Label>Название</Form.Label>
                <Form.Control
                  type="text"
                  value={newMetric.title}
                  onChange={(e) => setNewMetric({ ...newMetric, title: e.target.value })}
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
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>Закрыть</Button>
            <Button variant="primary" onClick={handleEditMetric}>Сохранить изменения</Button>
          </Modal.Footer>
        </Modal>
  
        {/* Модальное окно для добавления картинки */}
        <Modal show={showPictureModal} onHide={() => setShowPictureModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Добавить картинку к метрике</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="metricPicture">
                <Form.Label>Выберите картинку</Form.Label>
                <Form.Control
                  type="file"
                  onChange={handleFileChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowPictureModal(false)}>Закрыть</Button>
            <Button variant="primary" onClick={handleAddPicture}>Добавить картинку</Button>
          </Modal.Footer>
        </Modal>
      </div>
      </BasePage>
    );
  }
  
  export default ChangeMetricsPage;