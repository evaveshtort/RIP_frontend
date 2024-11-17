import "./metricDetailsPage.css";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Metric, getMetricById } from "../modules/StatisticianApi";
import { Spinner, Image } from "react-bootstrap";
import BasePage from "./BasePage";
import { ROUTES, ROUTE_LABELS } from "../../Routes.tsx";

export const MetricDetailsPage: FC = () => {
  const [pageData, setPageDdata] = useState<Metric>();
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    getMetricById(id).then((response) => setPageDdata(response));
  }, [id]);

  return (
      <div>
        {pageData ? (
          <>
            <BasePage
              crumbs={[
                { label: "", path: ROUTES.HOME },
                { label: ROUTE_LABELS.METRICS, path: ROUTES.METRICS },
                { label: pageData.title }
              ]}
            >
              <div className="metricPage">
                <div className="metricTitle">{pageData.title}</div>
                <div className="infoSpace">
                  <Image
                    src={pageData.picture_url}
                    alt="card"
                    height={200}
                    style={{ marginRight: "20px" }}
                  />
                  <p>{pageData.description}</p>
                </div>
              </div>
            </BasePage>
          </>
        ) : (
          <BasePage
            crumbs={[
              { label: "", path: ROUTES.HOME },
              { label: ROUTE_LABELS.METRICS, path: ROUTES.METRICS },
              { label: "" }
            ]}
          >
            <div className="metricPage">
              <div className="loadingBg">
                <Spinner animation="border" />
              </div>
            </div>
          </BasePage>
        )}
      </div>
  );
};
