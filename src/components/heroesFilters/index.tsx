import React from "react";
import { useSelector } from "react-redux";
import classNames from "classnames";

import { Spinner } from "../../components";

import { fetchFilters, useAppDispatch } from "../../redux/filters/asyncAction";
import { FilterType } from "../../redux/filters/types";
import { filtersSelector } from "../../redux/filters/selectors";
import { activeFilterChange } from "../../redux/filters/slice";

export const HeroesFilters: React.FC = () => {
  console.log("HeroesFilters render");

  const { filters, filtersLoadingStatus, activeFilter } =
    useSelector(filtersSelector);

  const dispatch = useAppDispatch();
  const filtersList = renderFiltersList(filters);

  React.useEffect(() => {
    dispatch(fetchFilters()); // eslint-disable-next-line
  }, []);

  if (filtersLoadingStatus === "loading") {
    return <Spinner />;
  } else if (filtersLoadingStatus === "error") {
    return <h5 className="text-center mt-5">Ошибка загрузки фильтров</h5>;
  }

  function renderFiltersList(arr: FilterType[]) {
    if (arr.length === 0) {
      return <h5 className="text-center mt-5">Фильтры не найдены</h5>;
    }

    return arr.map(({ name, className, label }: FilterType) => {
      const btnClass = classNames("btn", className, {
        active: name === activeFilter,
      });

      return (
        <button
          key={name}
          id={name}
          className={btnClass}
          onClick={() => dispatch(activeFilterChange(name))}
        >
          {label}
        </button>
      );
    });
  }

  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Отфильтруйте героев по элементам</p>
        <div className="btn-group">{filtersList}</div>
      </div>
    </div>
  );
};
