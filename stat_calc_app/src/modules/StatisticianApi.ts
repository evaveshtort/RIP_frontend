export interface Metric {
    metric_id: number;
    title: string;
    picture_url: string;
    description: string;
  }
  export interface MetricResult {
    draftCalculationId: number;
    metricsCount: number;
    metrics: Metric[];
  }
  
  export const getMetricByName = async (name = ""): Promise<MetricResult> => {
    return fetch(`/api/metrics/?metricName=${name}`).then(
      (response) => response.json()
    );
  };

  export const getMetricById = async (
    id: number | string
  ): Promise<Metric> => {
    return fetch(`/api/metrics/${id}/`).then(
      (response) => response.json()
    );
  };