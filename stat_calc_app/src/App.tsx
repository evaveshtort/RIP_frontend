import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { MetricDetailsPage } from "./pages/metricDetailsPage";
import { HomePage } from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import MetricsListPage from "./pages/metricsListPage";
import { ROUTES } from "../Routes";
import { dest_root } from "./target_config";
import AccountPage from "./pages/AccountPage";
import store, { persistor } from './app/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { CalculationPage } from "./pages/CalculationPage";
import  AllCalculationsPage from "./pages/AllCalculationsPage";
import ChangeMetricsPage from "./pages/ChangeMetricsPage";
import { ForbiddenPage } from "./pages/403";
import { NotFoundPage } from "./pages/404";
import MetricFormPage from "./pages/MetricFormPage";

function App() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter basename={dest_root}>
              <Routes>
                  <Route path={ROUTES.LOGIN} element={<LoginPage />} />
                  <Route path={ROUTES.ACCOUNT} element={<AccountPage />} />
                  <Route path={ROUTES.HOME} element={<HomePage />} />
                  <Route path={ROUTES.METRICS} element={<MetricsListPage />} />
                  <Route path={`${ROUTES.METRICS}/:id`} element={<MetricDetailsPage />} />
                  <Route path={`${ROUTES.CALC}/:calc_id`} element={<CalculationPage />}/>
                  <Route path={ROUTES.CALCS} element={<AllCalculationsPage />} />
                  <Route path={ROUTES.CHANGE} element={<ChangeMetricsPage />} />
                  <Route path={ROUTES.FORBIDDEN} element={<ForbiddenPage />} />
                  <Route path={ROUTES.NOTFOUND} element={<NotFoundPage />} />
                  <Route path="/metrics_form" element={<MetricFormPage />} />
                  <Route path="/metrics_form/:metricId" element={<MetricFormPage />} />
                  <Route path="*" element={<Navigate to={ROUTES.NOTFOUND} />} /> 
              </Routes>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    );
}

export default App;
