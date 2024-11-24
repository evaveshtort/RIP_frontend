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
    <nav>
      {crumbs.map((crumb, index) => (
        <span key={index}>
          {crumb.path ? (
            <Link style = {{color: 'grey', fontFamily: "monospace", textDecoration: "none"}} to={crumb.path}>{crumb.label}</Link>
          ) : (
            <span>{crumb.label}</span>
          )}
          {index < crumbs.length - 1 && " > "}
        </span>
      ))}
    </nav>
  );
};