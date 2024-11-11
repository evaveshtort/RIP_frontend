import { FC } from "react";
import { Card } from "react-bootstrap";
import "./MetricCard.css";

interface ICardProps {
  title: string;
  picture_url: string;
  imageClickHandler: () => void;
}

export const MetricCard: FC<ICardProps> = ({
  title,
  picture_url,
  imageClickHandler,
}) => {

  return (
    <Card className="card">
      <Card.Img
        className="cardImage"
        variant="top"
        src={picture_url}
        height={100}
        width={100}
        onClick={imageClickHandler}
      />
      <Card.Body>
        <div className="textStyle">
          <Card.Title>{title}</Card.Title>
        </div>
      </Card.Body>
    </Card>
  );
};