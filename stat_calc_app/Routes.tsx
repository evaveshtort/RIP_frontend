export const ROUTES = {
    HOME: "/",
    METRICS: "/metrics",
    LOGIN: "/login",
    ACCOUNT: "/account",
    CALC: "/calculation",
    CALCS: "/all_calculations",
    CHANGE: "/metrics_change",
    FORBIDDEN: '/forbidden',
    NOTFOUND: '/not_found',
    METRIC_FORM: '/metric_form'
  }
  export type RouteKeyType = keyof typeof ROUTES;
  export const ROUTE_LABELS: {[key in RouteKeyType]: string} = {
    HOME: "Главная",
    METRICS: "Метрики",
    LOGIN: "Вход",
    ACCOUNT: "Личный кабинет",
    CALC: "Расчет",
    CALCS: "Все расчёты",
    CHANGE: "Редактирование метрик",
    FORBIDDEN: "Доступ запрещен",
    NOTFOUND: "Страница не найдена",
    METRIC_FORM: "Форма метрики"
  };