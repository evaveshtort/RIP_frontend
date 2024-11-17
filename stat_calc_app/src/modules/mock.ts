import { MetricResult } from "./StatisticianApi";

export const METRICS_MOCK: MetricResult = {
  draft_calculation_id: -1, 
  metrics_count: 0,
  reset_flag: false,
  metrics: [
    {
        metric_id: 1,
        title: "Математическое ожидание",
        picture_url: "",
        description: "",
    },
    {
        metric_id: 2,
        title: "Дисперсия",
        picture_url: "",
        description: "",
    },
    {
        metric_id: 3,
        title: "Экстремумы",
        picture_url: "",
        description: "",
    },
  ],
};
