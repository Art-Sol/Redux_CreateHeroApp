// import { Formik, Field, Form, ErrorMessage } from 'formik';
// import * as Yup from 'yup';

import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import store from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { useHttp } from "../../hooks/http.hook";
import { useCreateHeroMutation } from "../../api/apiSlice";
import { selectAll  } from "../heroesFilters/filtersSlice";

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
	const [ heroName, setHeroName ] = useState('');
	const [ heroDescr, setHeroDescr ] = useState('');
	const [ heroElement, setHeroElement ] = useState('');

	const [ createHero ] = useCreateHeroMutation();

	const { filterLoadingStatus } = useSelector(state => state.filters);
	const filters = selectAll(store.getState());

	const onSubmitHandler = (e) => {
		e.preventDefault();

		const newHero = {
			id: uuidv4(),
			name: heroName,
			description: heroDescr,
			element: heroElement,
		}

		createHero(newHero).unwrap();

		setHeroName('');
		setHeroDescr('');
		setHeroElement('');
	}

	const renderFilters = (filters, status) => {
		if (status === "loading") {
			return <options>Загрузка элементов</options>
		} else if (status === "error") {
			return <options>Ошибка загрузки</options>
		}

		if (filters && filters.length > 0) {
			// console.log('options select render');
			
			return filters.map(({name, label}) => {
				// eslint-disable-next-line
				if (name === "all") return;
				return <option key={name} value={name}>{label}</option>
			});
		}
	}

	const options = renderFilters(filters, filterLoadingStatus);


	return (
		<form className="border p-4 shadow-lg rounded" onSubmit={onSubmitHandler}>
			<div className="mb-3">
				<label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
				<input 
					required
					type="text" 
					name="name" 
					className="form-control" 
					id="name"
					onChange={(e) => setHeroName(e.target.value)}
					value={heroName}
					placeholder="Как меня зовут?"
				/>
			</div>

			<div className="mb-3">
				<label htmlFor="text" className="form-label fs-4">Описание</label>
				<textarea
					required
					name="text" 
					className="form-control" 
					id="text" 
					onChange={(e) => setHeroDescr(e.target.value)}
					value={heroDescr}
					placeholder="Что я умею?"
					style={{"height": '130px'}}/>
			</div>

			<div className="mb-3">
				<label htmlFor="element" className="form-label">Выбрать элемент героя</label>
				<select 
					required
					className="form-select" 
					id="element" 
					name="element"
					onChange={(e) => setHeroElement(e.target.value)}
					value={heroElement}
				>
					<option >Я владею элементом...</option>
					{options}
				</select>
			</div>

			<button type="submit" className="btn btn-primary">Создать</button>
		</form>
	)
}







// const validSchema = Yup.object({
// 	name: Yup.string()
// 				.min(2, 'Минимум 2 символа для заполнения')
// 				.required('Обязательное поле!'),
// 	text: Yup.string()
// 				.min(10, 'Не менее 10 символов')
// 				.required('Обязательное поле!'),
// 	element: Yup.string().required('Выберите стихию')
// })

// const HeroesAddForm = () => {
// 	return (
// 		<Formik
// 			initialValues={{
// 				name: '',
// 				text: '',
// 				element: ''
// 			}}
// 			validationSchema={validSchema}
// 			onSubmit={values => console.log(JSON.stringify(values, null, 2))}
// 		>
// 			<Form className="border p-4 shadow-lg rounded">
// 				<div className="mb-3">
// 					<label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
// 					<Field 
// 						type="text" 
// 						name="name" 
// 						className="form-control" 
// 						id="name" 
// 						placeholder="Как меня зовут?"
// 					/>
// 					<ErrorMessage component="div" className='error' name='name'/>
// 				</div>

// 				<div className="mb-3">
// 					<label htmlFor="text" className="form-label fs-4">Описание</label>
// 					<Field
// 						name="text" 
// 						className="form-control" 
// 						id="text" 
// 						placeholder="Что я умею?"
// 						as="textarea"
// 						style={{"height": '130px'}}
// 					/>
// 					<ErrorMessage component="div" className='error' name='text'/>
// 				</div>

// 				<div className="mb-3">
// 					<label htmlFor="element" className="form-label">Выбрать элемент героя</label>
// 					<Field 
// 						required
// 						className="form-select" 
// 						id="element" 
// 						name="element"
// 						as="select"
// 					>
// 						<option >Я владею элементом...</option>
// 						<option value="fire">Огонь</option>
// 						<option value="water">Вода</option>
// 						<option value="wind">Ветер</option>
// 						<option value="earth">Земля</option>
// 					</Field>
// 					<ErrorMessage component="div" className='error' name='element'/>
// 				</div>

// 				<button type="submit" className="btn btn-primary">Создать</button>
// 			</Form>
// 		</Formik>
// 	)
// }

export default HeroesAddForm;