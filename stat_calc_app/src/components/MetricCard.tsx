import { FC } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
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
    <div className="card_container">
      <img
        className="cardImage"
        src={picture_url || image}
        alt="card"
        style={{width:"70%"}}
      />
      <div className="card-title">
        {title}
      </div>
    </div>
    <Link 
      to="/" 
      className="card-link"
      onClick={imageClickHandler}
    >
      Узнать больше &#8594;
    </Link>
  </Card>
);
