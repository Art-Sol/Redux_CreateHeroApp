import React from "react";
// import { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { HeroesListItem, Spinner } from "../../components";

import { heroesSelector } from "../../redux/heroes/selectors";
import { fetchHeroes, useAppDispatch } from "../../redux/heroes/asyncAction";
import { HeroType } from "../../redux/heroes/types";
import { heroDelete } from "../../redux/heroes/slice";

import "./heroesList.scss";

export const HeroesList: React.FC = () => {
  console.log("HeroesList render");

  const { heroes, heroesLoadingStatus } = useSelector(heroesSelector);
  const dispatch = useAppDispatch();

  const heroesList = renderHeroesList(heroes, heroesLoadingStatus);

  React.useEffect(() => {
    dispatch(fetchHeroes()); // eslint-disable-next-line
  }, []);

  const handleDelete = (id: string) => {
    dispatch(heroDelete(id));
  };

  function renderHeroesList(heroesArr: HeroType[], status: string) {
    if (status === "loading") {
      return <Spinner />;
    }

    if (status === "error") {
      return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
    }

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

  // const { data: heroes = [], isLoading, isError } = useGetHeroesQuery();

  // const [deleteHero] = useDeleteHeroMutation();

  // const activeFilter = useSelector((state) => state.filters.activeFilter);

  // const filteredHeroes = useMemo(() => {
  //   const filteredHeroes = heroes.slice();

  //   if (activeFilter == "all") {
  //     return filteredHeroes;
  //   } else {
  //     return filteredHeroes.filter((item) => item.element === activeFilter);
  //   }
  // }, [heroes, activeFilter]);

  // const onDelete = useCallback((id) => {
  //   deleteHero(id);
  //   // eslint-disable-next-line
  // }, []);

  // if (isLoading) {
  //   return <Spinner />;
  // } else if (isError) {
  //   return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
  // }

  // const elements = renderHeroesList(filteredHeroes);
  // return <TransitionGroup component="ul">{elements}</TransitionGroup>;
  return <TransitionGroup component="ul">{heroesList}</TransitionGroup>;
  // return <ul>{heroesList}</ul>;
};

// export default HeroesList;
