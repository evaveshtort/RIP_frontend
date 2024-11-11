// import { FC } from "react";
// import { Card } from "react-bootstrap";
// import "./MetricCard.css";

// interface ICardProps {
//   title: string;
//   picture_url: string;
//   imageClickHandler: () => void;
// }

// export const MetricCard: FC<ICardProps> = ({
//   title,
//   picture_url,
//   imageClickHandler,
// }) => {

//   return (
//     <Card className="card">
//       <Card.Img
//         className="cardImage"
//         variant="top"
//         src={picture_url}
//         height={100}
//         width={100}
//         onClick={imageClickHandler}
//       />
//       <Card.Body>
//         <div className="textStyle">
//           <Card.Title>{title}</Card.Title>
//         </div>
//       </Card.Body>
//     </Card>
//   );
// };

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
}) => (
  <Card className="flex_container_card">
    <div className="container">
      <img
        className="cardImage"
        src={picture_url}
        alt="card"
        style={{width:"60%"}}
      />
      <div className="card-title">
        {title}
      </div>
    </div>
    <a href="#" onClick={imageClickHandler} className="card-link">
      Узнать больше &#8594;
    </a>
  </Card>
);
