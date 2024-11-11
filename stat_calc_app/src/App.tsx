import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MetricDetailsPage } from "./pages/metricDetailsPage";
import { HomePage } from "./pages/HomePage";
import MetricsListPage from "./pages/metricsListPage";
import { ROUTES } from "../Routes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} index element={<HomePage />} />
        <Route path={ROUTES.METRICS} element={<MetricsListPage />} />
        <Route path={`${ROUTES.METRICS}/:id`} element={<MetricDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;