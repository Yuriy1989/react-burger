import { useState, useEffect, useCallback } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCookie, setCookie } from '../../utils/cookie';
import { actionRequestGetUser, actionRefreshAccessToken, actionRequestPatchUser } from '../../services/actions/actionsAuthorization';
import { api } from '../../utils/Api';


export function ProtectedRoute ({ children, ...rest }) {

  const timeCookie = 60;
  const accessToken = getCookie('accessToken');
  const refreshToken = getCookie('refreshToken');
  // const [feedFailed, setFeedFailed] = useState(false);
  // const [feedRequest, setFeedRequest] = useState(true);
  const feedFailed = useSelector((state) => state.authorization.feedFailed);
  const feedRequest = useSelector((state) => state.authorization.feedRequest);
  const dispatch = useDispatch();
  console.log('первая загрузка setFeedFailed ', feedFailed);
  console.log('первая загрузка setFeedRequest ', feedRequest);
  console.log('КУКИ accessToken,', accessToken);
  console.log('КУКИ refreshToken,', refreshToken);
  // const feedFailed = useSelector((state) => state.authorization.feedFailed);
  // const feedRequest = useSelector((state) => state.authorization.feedRequest);
  // const status = useSelector((state) => state.authorization.status);
  // const dispatch = useDispatch();
  // console.log('ProtectedRoute status = ', status);

  // async function getUserData () {
  //   dispatch(actionRequestGetUser(accessToken));
  // };

  //При переходе на страницу Профиля, делаем запрос к серверу и сохраняем данные в Store
  // useEffect(() => {
  //   if (accessToken) {
  //     dispatch(actionRequestGetUser(accessToken));
  //     console.log('accessToken TRUE = ', status);
  //     <Redirect to={{ pathname: '/profile' }} />
  //     if (!status && refreshToken) {
  //       dispatch(actionRefreshAccessToken(refreshToken));
  //       console.log('!status accessToken TRUE = ', status);
  //       <Redirect to={{ pathname: '/profile' }} />
  //     }
  //   } else if (!status && refreshToken) {
  //     dispatch(actionRefreshAccessToken(refreshToken));
  //     console.log('refreshToken TRUE = ', status);
  //     if (status) {
  //       dispatch(actionRequestGetUser(accessToken));
  //       console.log('status refreshToken TRUE = ', status);
  //       <Redirect to={{ pathname: '/profile' }} />
  //     }
  //   } else {
  //     <Redirect to={{ pathname: '/login' }} />
  //   }
  // }, [])

  // async function test () {
  //   return await setTimeout(() => {
  //     if(accessToken){
  //       console.log('Получение данных о пользователе');
  //       api.getUser(accessToken)
  //         .then(res => {
  //           if(res && (res.success === true)) {
  //             setFeedFailed(false);
  //             setFeedRequest(false);
  //             console.log('Получили данные о пользователе ', res);
  //             console.log('2 setFeedFailed ', feedFailed);
  //             console.log('2 setFeedRequest ', feedRequest);
  //           } else {
  //             setFeedFailed(true);
  //             setFeedRequest(false);
  //             console.log('2 setFeedFailed ', feedFailed);
  //             console.log('2 setFeedRequest ', feedRequest);
  //           }
  //         })
  //     } else {
  //       setFeedFailed(true);
  //       console.log('2 setFeedFailed ', feedFailed);
  //       console.log('2 setFeedRequest ', feedRequest);
  //     }
  //     console.log('2 setFeedFailed ', feedFailed);
  //     console.log('2 setFeedRequest ', feedRequest);
  //     if (refreshToken && feedFailed) {
  //     console.log('Погнали обновлять токен');
  //     setTimeout(() => {
  //       api.refreshToken(refreshToken)
  //         .then(res => {
  //           if (res && (res.success === true)) {
  //             setFeedFailed(false);
  //             setFeedRequest(false);
  //             setCookie('accessToken', newAccessToken, { 'max-age': timeCookie });
  //             setCookie('refreshToken', res.refreshToken);
  //             console.log('Обновление токена ', res);
  //             console.log('3 setFeedFailed ', feedFailed);
  //             console.log('3 setFeedRequest ', feedRequest);
  //           } else {
  //             setFeedFailed(true);
  //             setFeedRequest(false);
  //             <Redirect to={{ pathname: '/login' }} />
  //           }
  //         })
  //     }, "1000")
  //   }
  //   }, "1000")
  // }

  useEffect(() => {
    if(accessToken) {
      dispatch(actionRequestGetUser(accessToken));
    }

    if(!accessToken && refreshToken) {
      dispatch(actionRefreshAccessToken(refreshToken));
    }
  }, [accessToken]
  )

  return (
    <>
      {feedFailed && <h2 className={`text text_type_main-large`}>Произошла ошибка при получении данных</h2>}
      {feedRequest && <h2 className={`text text_type_main-large`}>Загрузка...</h2>}
      {
        !feedFailed && !feedRequest &&
        <Route
          {...rest}
          render={({ location }) =>
            accessToken ? (
              children
            ) : (
              <Redirect
                to={{
                  pathname: '/login',
                  state: { from: location }
                }}
              />
            )
          }
        />
      }
    </>
  )
}
