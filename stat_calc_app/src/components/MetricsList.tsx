import React from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';
import { Metric } from '../modules/StatisticianApi';
import { MetricCard } from './MetricCard';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import './MetricsList.css';

interface MetricsListProps {
  metrics: Metric[];
  loading: boolean;
  onCardClick: (id: number) => void;
  addClick: (id: number) => void;
  searchQuery: string;
}

const MetricsList: React.FC<MetricsListProps> = ({ metrics, loading, onCardClick, addClick }) => {
    const { searchQuery, shouldFilter } = useSelector((state: RootState) => state.metricsFilter);
  
    const filteredMetrics = shouldFilter
      ? metrics.filter((metric) =>
          metric.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : metrics;
  
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
            <Col key={metric.metric_id} xs={12} md={6} lg={4} style={{paddingRight: "0", maxWidth: "100%"}}>
              <MetricCard
                key={metric.metric_id}
                title={metric.title}
                picture_url={metric.picture_url}
                imageClickHandler={() => onCardClick(metric.metric_id)}
                addClickHandler={() => addClick(metric.metric_id)}
              />
            </Col>
          ))
        )}
      </Row>
      </div>
    );
  };

export default MetricsList;


