import { FC } from "react";
import { ROUTES } from "../../Routes.tsx";
import { Carousel, Col, Row } from "react-bootstrap";
import "./HomePage.css"
import BasePage from "./BasePage";

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
                  src="http://localhost:9000/items/frame1.png"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="carouselItem"
                  src="http://localhost:9000/items/frame2.png"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="carouselItem"
                  src="http://localhost:9000/items/frame3.png"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="carouselItem"
                  src="http://localhost:9000/items/frame4.png"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="carouselItem"
                  src="http://localhost:9000/items/frame5.png"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="carouselItem"
                  src="http://localhost:9000/items/frame6.png"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="carouselItem"
                  src="http://localhost:9000/items/frame7.png"
                />
              </Carousel.Item>
          </Carousel>
    </BasePage>
  );
};