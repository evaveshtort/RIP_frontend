import { dest_api } from "../target_config"

export interface Metric {
    metric_id: number;
    title: string;
    picture_url: string;
    description: string;
  }
  export interface MetricResult {
    draft_calculation_id: number;
    metrics_count: number;
    metrics: Metric[];
  }

  export const getAllMetrics = async (): Promise<MetricResult> => {
    return fetch(dest_api + `/metrics/`).then(
      (response) => response.json()
    );
  };
  
  export const getMetricByName = async (name = ""): Promise<MetricResult> => {
    return fetch(dest_api + `/metrics/?metricName=${name}`).then(
      (response) => response.json()
    );
  };

  export const getMetricById = async (
    id: number | string
  ): Promise<Metric> => {
    return fetch(dest_api + `/metrics/${id}/`).then(
      (response) => response.json()
    );
  };