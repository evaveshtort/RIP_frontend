import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MetricDetailsPage } from "./pages/metricDetailsPage";
import { HomePage } from "./pages/HomePage";
import MetricsListPage from "./pages/metricsListPage";
import { ROUTES } from "../Routes";
import BasePage from "./pages/BasePage";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path={ROUTES.HOME} index element={<HomePage />} />
//         <Route path={ROUTES.METRICS} element={<MetricsListPage />} />
//         <Route path={`${ROUTES.METRICS}/:id`} element={<MetricDetailsPage />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

function App() {
    return (
      <BrowserRouter>
        <Routes>
          {/* Главная страница */}
          <Route
            path={ROUTES.HOME}
            index
            element={
              <BasePage
                crumbs={[{ label: "Главная", path: ROUTES.HOME }]}
              >
                <HomePage />
              </BasePage>
            }
          />
          
          {/* Страница списка метрик */}
          <Route
            path={ROUTES.METRICS}
            element={
              <BasePage
                crumbs={[
                  { label: "Главная", path: ROUTES.HOME },
                  { label: "Метрики", path: ROUTES.METRICS },
                ]}
              >
                <MetricsListPage />
              </BasePage>
            }
          />
          
          {/* Страница деталей метрики */}
          <Route
            path={`${ROUTES.METRICS}/:id`}
            element={
              <BasePage
                crumbs={[
                  { label: "Главная", path: ROUTES.HOME },
                  { label: "Метрики", path: ROUTES.METRICS },
                  { label: "Детали метрики" },
                ]}
              >
                <MetricDetailsPage />
              </BasePage>
            }
          />
        </Routes>
      </BrowserRouter>
    );
  }
  
  export default App;