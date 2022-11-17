import React from "react";

type HeroesListItemPropsType = {
  onDelete: () => void;
  name: string;
  description: string;
  element: string;
};

export const HeroesListItem: React.FC<HeroesListItemPropsType> = (props) => {
  console.log("HeroesListItem render");
  const { onDelete, name, description, element } = props;
  const className = setClassName(element);

  function setClassName(element: string) {
    switch (element) {
      case "fire":
        return "bg-danger bg-gradient";
      case "water":
        return "bg-primary bg-gradient";
      case "wind":
        return "bg-success bg-gradient";
      case "earth":
        return "bg-secondary bg-gradient";
      default:
        return "bg-warning bg-gradient";
    }
  }

  return (
    <li className={`card flex-row mb-4 shadow-lg text-white ${className}`}>
      <img
        src="http://www.stpaulsteinbach.org/wp-content/uploads/2014/09/unknown-hero.jpg"
        className="img-fluid w-25 d-inline"
        alt="unknown hero"
        style={{ objectFit: "cover" }}
      />
      <div className="card-body">
        <h3 className="card-title">{name}</h3>
        <p className="card-text">{description}</p>
      </div>
      <span
        className="position-absolute top-0 start-100 translate-middle badge border rounded-pill bg-light"
        onClick={onDelete}
      >
        <button
          type="button"
          className="btn-close btn-close"
          aria-label="Close"
        ></button>
      </span>
    </li>
  );
};
