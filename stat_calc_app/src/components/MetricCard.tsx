import { FC } from "react";
import { Card, Button } from "react-bootstrap";
import "./MetricCard.css";
import image from "./DefaultImage.png";
import { dest_minio } from "../target_config"
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

interface ICardProps {
  key: number;
  title: string;
  picture_url: string;
  imageClickHandler: () => void;
  addClickHandler: () => void;
}

export const MetricCard: FC<ICardProps> = ({
  title,
  picture_url,
  imageClickHandler,
  addClickHandler,
}) => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  return(<Card className="flex_container_card">
    <div className="card_cont">
    <div className="card_container">
      <img
        className="cardImage"
        src={(picture_url !== null) ? (picture_url.replace("http://localhost:9000", dest_minio) || image):(image)}
        alt="card"
        style={{width:"70%"}}
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
    {isLoggedIn ? (<Button
      className="card-link-add"
      onClick={addClickHandler}
    >
      Добавить в вычисление &#8594;
    </Button>):(<></>)}
    </div>
  </Card>)
};
