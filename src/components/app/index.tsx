import React from "react";
import { HeroesList, HeroesFilters, HeroesAddForm } from "..";

import "./app.scss";

export const App: React.FC = () => {
  return (
    <main className="app">
      <div className="content">
        <HeroesList />
        <div className="content__interactive">
          <HeroesAddForm />
          <HeroesFilters />
        </div>
      </div>
    </main>
  );
};
