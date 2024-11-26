import React from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';
import { Metric } from '../modules/StatisticianApi';
import { MetricCard } from './MetricCard';
import { useSelector, useDispatch } from 'react-redux';
import { resetFilter } from '../features/metricsFilterSlice';
import { RootState } from '../app/store';
import { useEffect } from "react";
import './MetricsList.css';

interface MetricsListProps {
  metrics: Metric[];
  loading: boolean;
  onCardClick: (id: number) => void;
  searchQuery: string;
}

const MetricsList: React.FC<MetricsListProps> = ({ metrics, loading, onCardClick }) => {
    const { searchQuery, shouldFilter } = useSelector((state: RootState) => state.metricsFilter);
    const dispatch = useDispatch();
  
    const filteredMetrics = shouldFilter
      ? metrics.filter((metric) =>
          metric.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : metrics;
  
    useEffect(() => {
      if (shouldFilter) {
        dispatch(resetFilter());
      }
    }, [shouldFilter, dispatch]);
  
    if (loading) {
      return (
        <div className="loadingBg">
          <Spinner animation="border" />
        </div>
      );
    }
  
    return (
      <div className='cards'>
      <Row className='justify-content-start align-items-stretch'>
        {filteredMetrics.length === 0 ? (
          <div className="emptyList">К сожалению, пока ничего не найдено</div>
        ) : (
          filteredMetrics.map((metric) => (
            <Col key={metric.metric_id} xs={12} md={6} lg={4}>
              <MetricCard
                key={metric.metric_id}
                title={metric.title}
                picture_url={metric.picture_url}
                imageClickHandler={() => onCardClick(metric.metric_id)}
              />
            </Col>
          ))
        )}
      </Row>
      </div>
    );
  };

export default MetricsList;


