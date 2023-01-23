import React, { useEffect, useCallback, FC } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import app from './app.module.css';
import style from '@ya.praktikum/react-developer-burger-ui-components';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Switch, Route } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router-dom';
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
import { getCookie } from '../../utils/cookie';
import { actionRequestGetUser } from '../../services/actions/actionsAuthorization';
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
import { useAppDispatch, useAppSelector } from '../../services/store/hooks';

// interface IStateX {
//   hash: string,
//   key: string,
//   pathname: string,
//   search: string,
//   state: from: hash: ""
//   key: string,
//   pathname: string,
//   search: string,
//   state: null,
//   stateModal: from: hash: "",
//   key: string,
//   pathname: string,
//   search: string,
//   state: null,
// }
import { Location } from "history";



interface IState {
  isOpenModalIngredient?: string | undefined,
  isOpenModalError?: string | undefined,
  isOpenModalDetails?: string | undefined,
  isOpenModalFeed?: string | undefined,
  isOpenModalOrder?: string | undefined,
}

interface ILocationState extends IState {
  hash: string,
  key: string,
  pathname: string,
  search: string,
}

let xxx: ILocationState = {
  hash: "srty",
  key: '',
  pathname: '',
  search: '',
  isOpenModalIngredient: undefined,
  isOpenModalError: undefined,
  isOpenModalDetails: undefined,
  isOpenModalFeed: undefined,
  isOpenModalOrder: undefined,
}

console.log('xxx', xxx);

const App: FC = () => {
  const dispatch = useAppDispatch();
  // const location = useLocation<ILocationState>();
  const location = useLocation<{ background: Location }>();
  const background = location.state && location.state.background;


  const history = useHistory();
  const isOpenModalIngredient = location.state?.isOpenModalIngredient;
  const isOpenModalError = location.state?.isOpenModalError;
  const isOpenModalDetails = location.state?.isOpenModalDetails;
  const isOpenModalFeed = location.state?.isOpenModalFeed;
  const isOpenModalOrder = location.state?.isOpenModalOrder;
  const accessToken = getCookie('accessToken');
  const refreshToken = getCookie('refreshToken');
  const isAuth = useAppSelector((state) => state.authorization.isAuth);

  //делаем запрос к серверу для получения всех ингредиентов
  useEffect(() => {
    dispatch(getIngredients());
    dispatch(actionRequestGetUser(accessToken, refreshToken))
  }, [])

  // Если авторизация прошла успешно редирект на ранее открытую страницу
  useEffect(() => {
    if (isAuth && location.stateModal?.from) {
      history.replace(location?.stateModal?.from);
    } else if (isAuth && location.state?.from) {
      history.replace(location?.state?.from);
    }

  }, [isAuth])

  // Закрытие модалки - возврат на предыдущую страницу
  const closeModals = useCallback(
    () => {
      history.goBack();
    }, []
  )

  const feedFailed = useAppSelector((state) => state.getIngredientsApi.feedFailed);
  const feedRequest = useAppSelector((state) => state.getIngredientsApi.feedRequest);

  return (
    <>
      {feedFailed && <h2 className={`text text_type_main-large`}>Произошла ошибка при получении данных</h2>}
      {feedRequest && <Loader />}
      {!feedFailed && !feedRequest &&
        <>
          <div className={app.app}>
            <div className={app.header}>
              <AppHeader />
            </div>
            <Switch location={isOpenModalDetails || isOpenModalError || isOpenModalIngredient || isOpenModalFeed || isOpenModalOrder || location}>
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
              <ProtectedRoute path="/profile/orders" exact={true} isAuth={isAuth}>
                <Orders />
              </ProtectedRoute>
              <ProtectedRoute path={'/profile/orders/:id'} isAuth={isAuth}>
                <FeedId />
              </ProtectedRoute>
              <ProtectedRoute path="/profile" isAuth={isAuth} exact={true}>
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
              <Modal title="Детали ингредиента" closeModals={closeModals} >
                <IngredientDetails />
              </Modal>
            </Route>)
            }
            {isOpenModalFeed && (<Route path={`/feed/:id`} exact={true}>
              <Modal title="" closeModals={closeModals} >
                <FeedIdDetails />
              </Modal>
            </Route>)
            }
            {isOpenModalOrder && (<Route path={`/profile/orders/:id`} exact={true}>
              <Modal title="" closeModals={closeModals}>
                <FeedIdDetails />
              </Modal>
            </Route>)
            }
            {isOpenModalDetails && (<Route path={`/orderDetails`} exact={true}>
              <Modal title="" closeModals={closeModals}>
                <OrderDetails />
              </Modal>
            </Route>)
            }
            {isOpenModalError && (<Route path={`/error`} exact={true} >
              <Modal title="" closeModals={closeModals}>
                <OrderMessage />
              </Modal>
            </Route>)
            }
          </div>
        </>
      }
    </>
  );
}

export default App;
