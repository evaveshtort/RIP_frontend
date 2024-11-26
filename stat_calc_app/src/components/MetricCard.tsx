import { FC } from "react";
import { Card, Button } from "react-bootstrap";
import "./MetricCard.css";
import image from "./DefaultImage.png";

interface ICardProps {
  key: number;
  title: string;
  picture_url: string;
  imageClickHandler: () => void;
}

export const MetricCard: FC<ICardProps> = ({
  title,
  picture_url,
  imageClickHandler,
}) => (
  <Card className="flex_container_card">
    <div className="card_cont">
    <div className="card_container">
      <img
        className="cardImage"
        src={picture_url || image}
        alt="card"
        style={{width:"60%"}}
      />
      <div className="card-title">
        {title}
      </div>
    </div>
    <Button
      className="card-link"
      onClick={imageClickHandler}
    >
      Узнать больше &#8594;
    </Button>
    </div>
  </Card>
);
