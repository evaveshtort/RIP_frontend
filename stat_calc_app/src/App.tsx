import { HashRouter, Route, Routes } from "react-router-dom";
import { MetricDetailsPage } from "./pages/metricDetailsPage";
import { HomePage } from "./pages/HomePage";
import MetricsListPage from "./pages/metricsListPage";
import { ROUTES } from "../Routes";

function App() {

  const basename = import.meta.env.PROD ? "/statistician-frontend" : "/";

    return (
      <HashRouter basename={basename}>
        <Routes>
          <Route path={ROUTES.HOME} index element ={<HomePage />}/>
          <Route path={ROUTES.METRICS} index element={<MetricsListPage />}/>
          <Route path={`${ROUTES.METRICS}/:id`} index element={<MetricDetailsPage />}/>
        </Routes>
      </HashRouter>
    );
  }
  
  export default App;