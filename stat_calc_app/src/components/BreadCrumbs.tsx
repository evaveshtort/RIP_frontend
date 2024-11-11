// import "./BreadCrumbs.css";
// import React from "react";
// import { Link } from "react-router-dom";
// import { FC } from "react";
// import { ROUTES } from "../../Routes";

// interface ICrumb {
//   label: string;
//   path?: string;
// }

// interface BreadCrumbsProps {
//   crumbs: ICrumb[];
// }

// export const BreadCrumbs: FC<BreadCrumbsProps> = (props) => {
//   const { crumbs } = props;

//   return (
//     <ul className="breadcrumbs">
//       <li>
//         <Link to={ROUTES.HOME}>Главная</Link>
//       </li>
//       {!!crumbs.length &&
//         crumbs.map((crumb, index) => (
//           <React.Fragment key={index}>
//             <li className="slash">/</li>
//             {index === crumbs.length - 1 ? (
//               <li>{crumb.label}</li>
//             ) : (
//               <li>
//                 <Link to={crumb.path || ""}>{crumb.label}</Link>
//               </li>
//             )}
//           </React.Fragment>
//         ))}
//     </ul>
//   );
// };

import { FC } from "react";
import { Link } from "react-router-dom";

interface ICrumb {
  label: string;
  path?: string;
}

interface IBreadCrumbsProps {
  crumbs: ICrumb[];
}

export const BreadCrumbs: FC<IBreadCrumbsProps> = ({ crumbs }) => {
  return (
    <nav className="breadcrumbs">
      {crumbs.map((crumb, index) => (
        <span key={index}>
          {crumb.path ? (
            <Link to={crumb.path}>{crumb.label}</Link>
          ) : (
            <span>{crumb.label}</span>
          )}
          {index < crumbs.length - 1 && " > "}
        </span>
      ))}
    </nav>
  );
};