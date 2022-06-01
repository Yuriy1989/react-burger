import React, { useState } from 'react';
import style, { Tab, CurrencyIcon  } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerIngredients from './burgerIngredients.module.css'

export default function BurgerIngredients({ data }) {
	const [current, setCurrent] = useState('one');
	console.log(data);

	const arr = data.map((item) =>
		<div key={item._id}>
			<h3>{item.name}</h3>
			<ul>
				<li className={burgerIngredients.burgerIngredients__item}>
					<img src={item.image}></img>
					<p>{item.price}</p>
					<CurrencyIcon type="primary" />
					<p>{item.name}</p>
				</li>
			</ul>
		</div>
	);

	return (
		<>
			<section className={burgerIngredients.burgerIngredients}>
			<h2 className={` ${burgerIngredients.burgerIngredients__title} text text_type_main-large`}>Собери бургер</h2>
					<div style={{ display: 'flex' }}>
						<Tab value="one" active={current === 'one'} onClick={setCurrent}>
							Булки
						</Tab>
						<Tab value="two" active={current === 'two'} onClick={setCurrent}>
							Соусы
						</Tab>
						<Tab value="three" active={current === 'three'} onClick={setCurrent}>
							Начинки
						</Tab>
					</div>
					<h2>Булки</h2>
					<div className={burgerIngredients.burgerIngredients__ingredient}>
						
							{
								data.filter(card => card.type == 'bun').map(filteredType => (
									<p key={filteredType._id}>{filteredType.name}</p>
								))
							}
						
					</div>
					<h2>Соусы</h2>
					<div className={burgerIngredients.burgerIngredients__ingredient}>
					{
								data.filter(card => card.type == 'sauce').map(filteredType => (
									<p key={filteredType._id}>{filteredType.name}</p>
								))
							}
					</div>
					<h2>Начинка</h2>
					<div className={burgerIngredients.burgerIngredients__ingredient}>
					{
								data.filter(card => card.type == 'main').map(filteredType => (
									<p key={filteredType._id}>{filteredType.name}</p>
								))
							}
					</div>
			</section>
		</>
	);
}
