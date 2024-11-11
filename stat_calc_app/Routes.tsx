export const ROUTES = {
    HOME: "/",
    METRICS: "/metrics",
  }
  export type RouteKeyType = keyof typeof ROUTES;
  export const ROUTE_LABELS: {[key in RouteKeyType]: string} = {
    HOME: "Главная",
    METRICS: "Метрики",
  };