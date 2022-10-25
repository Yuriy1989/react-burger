import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import app from './app.module.css';
import style from '@ya.praktikum/react-developer-burger-ui-components';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useLocation, Redirect } from 'react-router-dom';
import { ProtectedRoute } from '../protectedRoute/ProtectedRoute';

import { getIngredients } from '../../services/actions/ingredients';
import AppHeader from '../appHeader/AppHeader';
import BurgerIngredients from '../burgerIngredients/BurgerIngredients';
import BurgerConstructor from '../burgerConstructor/BurgerConstructor';
import Modal from '../modal/Modal';
import OrderDetails from '../orderDetails/OrderDetails';
import OrderMessage from '../orderMessage/OrderMessage';
import IngredientDetails from '../ingredientDetails/IngredientDetails';
import { Login, Register, ForgotPassword, ResetPassword, Profile, Ingredients } from '../../pages';

export default function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const isOpenModalIngredient = location.state?.isOpenModalIngredient;
  const isOpenModalError = location.state?.isOpenModalError;
  const isOpenModalDetails = location.state?.isOpenModalDetails;

  //делаем запрос к серверу для получения всех ингредиентов
  useEffect(() => {
    dispatch(getIngredients());
  }, [])

  const feedFailed = useSelector((state) => state.getIngredientsApi.feedFailed);
  const feedRequest = useSelector((state) => state.getIngredientsApi.feedRequest);

  return (
    <>
      {feedFailed && <h2 className={`text text_type_main-large`}>Произошла ошибка при получении данных</h2>}
      {feedRequest && <h2 className={`text text_type_main-large`}>Загрузка...</h2>}
      {!feedFailed && !feedRequest &&
        <>
        <main className={app.app}>
          <DndProvider backend={HTML5Backend}>
            <Switch location={isOpenModalDetails || isOpenModalError || isOpenModalIngredient || location}>
              <Route path="/login" exact={true}>
                <div className={app.header}>
                  <AppHeader />
                </div>
                <Login />
              </Route>
              <Route path="/register" exact={true}>
                <div className={app.header}>
                  <AppHeader />
                </div>
                <Register />
              </Route>
              <Route path="/forgot-password" exact={true}>
                <div className={app.header}>
                  <AppHeader />
                </div>
                <ForgotPassword />
              </Route>
              <Route path="/reset-password" exact={true}>
                <div className={app.header}>
                  <AppHeader />
                </div>
                <ResetPassword />
              </Route>
              <Route path={`/ingredients/:id`} >
                <div className={app.header}>
                  <AppHeader />
                </div>
                <Ingredients />
              </Route>
              <ProtectedRoute path="/profile" exact={true}>
                <div className={app.header}>
                  <AppHeader />
                </div>
                <Profile />
              </ProtectedRoute>
              <ProtectedRoute path="/" exact={true}>
                <div className={app.header}>
                  <AppHeader />
                </div>
                <div className={app.section}>
                  <BurgerIngredients />
                  <BurgerConstructor />
                </div>
              </ProtectedRoute>
            </Switch>
            {isOpenModalIngredient && (<Route path={`/ingredients/:id`} exact={true}>
              <Modal title="Детали ингредиента" >
                <IngredientDetails />
              </Modal>
            </Route>)
            }
            {isOpenModalDetails && (<Route path={`/orderDetails`} exact={true}>
              <Modal title="" >
              <OrderDetails />
              </Modal>
            </Route>)
            }
            {isOpenModalError && (<Route path={`/error`} exact={true} >
              <Modal title="" >
                <OrderMessage />
              </Modal>
            </Route>)
            }
          </DndProvider>
          </main>
        </>
      }
    </>
  );
}
