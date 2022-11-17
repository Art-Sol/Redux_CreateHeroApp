import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { useSelector, useDispatch } from "react-redux";

import { heroCreate } from "../../redux/heroes/slice";
import { filtersSelector } from "../../redux/filters/selectors";
import { FilterType } from "../../redux/filters/types";
import { HeroType } from "../../redux/heroes/types";

type newHeroPropsType = {
  name: string;
  description: string;
  element: string;
};

export const HeroesAddForm: React.FC = () => {
  console.log("HeroesAddForm render");

  const { filters, filtersLoadingStatus } = useSelector(filtersSelector);
  const dispatch = useDispatch();

  const options = renderOptionsList(filters, filtersLoadingStatus);

  const handleSubmitForm = (newHeroProps: newHeroPropsType) => {
    console.log(newHeroProps);
    const { name, description, element } = newHeroProps;

    const newHero: HeroType = {
      id: uuidv4(),
      name,
      description,
      element,
    };

    dispatch(heroCreate(newHero));
  };

  function renderOptionsList(filters: FilterType[], status: string) {
    if (status === "loading") {
      return <option>Загрузка элементов</option>;
    }

    if (status === "error") {
      return <option>Ошибка загрузки</option>;
    }

    if (filters && filters.length > 0) {
      return filters.map(({ name, label }) => {
        return name !== "all" ? (
          <option key={name} value={name}>
            {label}
          </option>
        ) : null;
      });
    }
  }

  const validSchema = Yup.object({
    name: Yup.string()
      .min(2, "Минимум 2 символа для заполнения")
      .required("Обязательное поле!"),
    description: Yup.string()
      .min(10, "Не менее 10 символов")
      .required("Обязательное поле!"),
    element: Yup.string().required("Выберите стихию"),
  });

  return (
    <Formik
      initialValues={{
        name: "",
        description: "",
        element: "",
      }}
      validationSchema={validSchema}
      onSubmit={(values) => handleSubmitForm(values)}
    >
      <Form className="border p-4 shadow-lg rounded">
        <div className="mb-3">
          <label htmlFor="name" className="form-label fs-4">
            Имя нового героя
          </label>
          <Field
            type="text"
            name="name"
            className="form-control"
            id="name"
            placeholder="Как меня зовут?"
          />
          <ErrorMessage component="div" className="error" name="name" />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label fs-4">
            Описание
          </label>
          <Field
            name="description"
            className="form-control"
            id="description"
            placeholder="Что я умею?"
            as="textarea"
            style={{ height: "100px" }}
          />
          <ErrorMessage component="div" className="error" name="description" />
        </div>

        <div className="mb-3">
          <label htmlFor="element" className="form-label">
            Выбрать элемент героя
          </label>
          <Field
            required
            className="form-select"
            id="element"
            name="element"
            as="select"
          >
            <option>Я владею элементом...</option>
            {options}
          </Field>
          <ErrorMessage component="div" className="error" name="element" />
        </div>

        <button type="submit" className="btn btn-primary">
          Создать
        </button>
      </Form>
    </Formik>
  );
};

// <form className="border p-4 shadow-lg rounded" onSubmit={handleSubmit}>
//   <div className="mb-3">
//     <label htmlFor="name" className="form-label fs-4">
//       Имя нового героя
//     </label>
//     <input
//       required
//       type="text"
//       name="name"
//       className="form-control"
//       id="name"
//       onChange={(e) => setHeroName(e.target.value)}
//       value={heroName}
//       placeholder="Как меня зовут?"
//     />
//   </div>

//   <div className="mb-3">
//     <label htmlFor="text" className="form-label fs-4">
//       Описание
//     </label>
//     <textarea
//       required
//       name="text"
//       className="form-control"
//       id="text"
//       onChange={(e) => setHeroDescr(e.target.value)}
//       value={heroDescr}
//       placeholder="Что я умею?"
//       style={{ height: "130px" }}
//     />
//   </div>

//   <div className="mb-3">
//     <label htmlFor="element" className="form-label">
//       Выбрать элемент героя
//     </label>
//     <select
//       required
//       className="form-select"
//       id="element"
//       name="element"
//       onChange={(e) => setHeroElement(e.target.value)}
//       value={heroElement}
//     >
//       <option>Я владею элементом...</option>
//       {options}
//     </select>
//   </div>

//   <button type="submit" className="btn btn-primary">
//     Создать
//   </button>
// </form>
