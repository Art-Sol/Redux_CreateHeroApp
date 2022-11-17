import React from "react";
import { useSelector } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { HeroesListItem, Spinner } from "../../components";

import { heroesSelector } from "../../redux/heroes/selectors";
import { filtersSelector } from "../../redux/filters/selectors";
import { fetchHeroes, useAppDispatch } from "../../redux/heroes/asyncAction";
import { heroDelete } from "../../redux/heroes/slice";
import { HeroType } from "../../redux/heroes/types";

import "./heroesList.scss";

export const HeroesList: React.FC = () => {
  console.log("HeroesList render");

  const { heroes, heroesLoadingStatus } = useSelector(heroesSelector);
  const { activeFilter } = useSelector(filtersSelector);
  const dispatch = useAppDispatch();

  const filteredHeroes = filteringHeroes(heroes);
  const heroesList = renderHeroesList(filteredHeroes, heroesLoadingStatus);

  React.useEffect(() => {
    dispatch(fetchHeroes()); // eslint-disable-next-line
  }, []);

  const handleDelete = (id: string) => {
    dispatch(heroDelete(id));
  };

  function renderHeroesList(heroesArr: HeroType[], status: string) {
    if (status === "success") {
      if (heroesArr.length === 0) {
        return (
          <CSSTransition timeout={300} classNames="hero">
            <h5 className="text-center mt-5">Героев пока нет</h5>
          </CSSTransition>
        );
      }

      return heroesArr.map(({ id, ...props }) => {
        return (
          <CSSTransition key={id} timeout={300} classNames="hero">
            <HeroesListItem onDelete={() => handleDelete(id)} {...props} />
          </CSSTransition>
        );
      });
    }
  }

  function filteringHeroes(heroes: HeroType[]) {
    const filteredHeroes = heroes.slice();

    if (activeFilter === "all") {
      return filteredHeroes;
    } else {
      return filteredHeroes.filter((item) => item.element === activeFilter);
    }
  }

  if (heroesLoadingStatus === "loading") {
    return <Spinner />;
  }

  if (heroesLoadingStatus === "error") {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
  }

  return <TransitionGroup component="ul">{heroesList}</TransitionGroup>;
};
