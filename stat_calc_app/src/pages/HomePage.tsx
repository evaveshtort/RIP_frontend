import { FC } from "react";
import { ROUTES } from "../../Routes.tsx";
import { Carousel, Col } from "react-bootstrap";
import "./HomePage.css"
import BasePage from "./BasePage";
import frame1 from "../components/frame1.png";
import frame2 from "../components/frame2.png";
import frame3 from "../components/frame3.png";
import frame4 from "../components/frame4.png";
import frame5 from "../components/frame5.png";
import frame6 from "../components/frame6.png";
import frame7 from "../components/frame7.png";

export const HomePage: FC = () => {
  return (
    <BasePage crumbs={[{ label: "", path: ROUTES.HOME }]}>
      <div className="container">
          <Col md={12}>
            <h3>Добро пожаловать в Statistician!</h3>
            <p>Здесь вы легко и быстро можете рассчитать ключевые статистические метрики.</p>
            <p>Воспользуйтесь нашими инструментами, чтобы получить математическое ожидание, дисперсию и другие важные показатели.
              Просто выберите нужные метрики и введите набор данных, остально мы сделаем за вас.
              Наш сервис поможет вам понять ваши данные и принять обоснованные решения.</p>
            <p>Начните исследовать прямо сейчас!</p>
          </Col>
      </div>
      <Carousel controls={false} indicators={false} interval ={750} pause={false} slide={false}>
              <Carousel.Item>
                <img
                  className="carouselItem"
                  src={frame1}
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="carouselItem"
                  src={frame2}
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="carouselItem"
                  src={frame3}
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="carouselItem"
                  src={frame4}
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="carouselItem"
                  src={frame5}
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="carouselItem"
                  src={frame6}
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="carouselItem"
                  src={frame7}
                />
              </Carousel.Item>
          </Carousel>
    </BasePage>
  );
};