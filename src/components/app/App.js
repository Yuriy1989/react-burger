import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import app from './app.module.css';
import style from '@ya.praktikum/react-developer-burger-ui-components';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Switch, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { ProtectedRoute } from '../protectedRoute/ProtectedRoute';
import { OnlyUnAuthRoute } from '../onlyUnAuthRoute/OnlyUnAuthRoute';
import { getIngredients } from '../../services/actions/ingredients';
import AppHeader from '../appHeader/AppHeader';
import BurgerIngredients from '../burgerIngredients/BurgerIngredients';
import BurgerConstructor from '../burgerConstructor/BurgerConstructor';
import Modal from '../modal/Modal';
import OrderDetails from '../orderDetails/OrderDetails';
import OrderMessage from '../orderMessage/OrderMessage';
import IngredientDetails from '../ingredientDetails/IngredientDetails';
import FeedIdDetails from '../feedIdDetails/FeedIdDetails';
import Loader from '../loader/Loader';
import {
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  Ingredients,
  Feed,
  FeedId,
  Orders,
  NotFoundPage
} from '../../pages';

export default function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const isOpenModalIngredient = location.state?.isOpenModalIngredient;
  const isOpenModalError = location.state?.isOpenModalError;
  const isOpenModalDetails = location.state?.isOpenModalDetails;
  const isOpenModalFeed = location.state?.isOpenModalFeed;
  const isOpenModalOrder = location.state?.isOpenModalOrder;

  //делаем запрос к серверу для получения всех ингредиентов
  useEffect(() => {
    dispatch(getIngredients());
  }, [])

  const feedFailed = useSelector((state) => state.getIngredientsApi.feedFailed);
  const feedRequest = useSelector((state) => state.getIngredientsApi.feedRequest);

  return (
    <>
      {feedFailed && <h2 className={`text text_type_main-large`}>Произошла ошибка при получении данных</h2>}
      {feedRequest &&  <Loader />}
      {!feedFailed && !feedRequest &&
        <>
        <main className={app.app}>
          <div className={app.header}>
            <AppHeader />
          </div>
          <Switch location={isOpenModalDetails || isOpenModalError || isOpenModalIngredient || isOpenModalFeed || isOpenModalOrder|| location}>
            <OnlyUnAuthRoute path="/login" exact={true}>
              <Login />
            </OnlyUnAuthRoute>
            <OnlyUnAuthRoute path="/register" exact={true}>
              <Register />
            </OnlyUnAuthRoute>
            <OnlyUnAuthRoute path="/forgot-password" exact={true}>
              <ForgotPassword />
            </OnlyUnAuthRoute>
            <OnlyUnAuthRoute path="/reset-password" exact={true}>
              <ResetPassword />
            </OnlyUnAuthRoute>
            <Route path={`/ingredients/:id`} >
              <Ingredients />
            </Route>
            <Route path="/feed" exact={true}>
              <Feed />
            </Route>
            <Route path={`/feed/:id`} exact={true}>
              <FeedId />
            </Route>
            <ProtectedRoute path="/profile/orders" exact={true}>
              <Orders />
            </ProtectedRoute>
            <ProtectedRoute path={'/profile/orders/:id'} exact={true}>
              <FeedId />
            </ProtectedRoute>
            <ProtectedRoute path="/profile" exact={true}>
              <Profile />
            </ProtectedRoute>
            <Route path="/" exact={true}>
              <DndProvider backend={HTML5Backend}>
                <div className={app.section}>
                  <BurgerIngredients />
                  <BurgerConstructor />
                </div>
              </DndProvider>
            </Route>
            <Route path='*'>
              <NotFoundPage />
            </Route>
          </Switch>
          {isOpenModalIngredient && (<Route path={`/ingredients/:id`} exact={true}>
            <Modal title="Детали ингредиента" >
              <IngredientDetails />
            </Modal>
          </Route>)
          }
          {isOpenModalFeed && (<Route path={`/feed/:id`} exact={true}>
            <Modal title="" >
              <FeedIdDetails />
            </Modal>
          </Route>)
          }
          {isOpenModalOrder && (<Route path={`/profile/orders/:id`} exact={true}>
            <Modal title="" >
              <FeedIdDetails />
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
        </main>
        </>
      }
    </>
  );
}
