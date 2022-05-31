import React, { useState } from 'react';
import style, { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerIngredients from './burgerIngredients.module.css'

export default function BurgerIngredients({data}) {
	const [current, setCurrent] = useState('one');
	console.log(data);
  return (
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
			{
				data.map((item) => (
					<div>
						<h3>Булки</h3>
						<ul>
							<li>
								<img></img>
								<p>{item}</p>
								<p></p>
							</li>
						</ul>
					</div>
				))
			}
    </section>
  );
}
