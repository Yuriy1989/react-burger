import { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCookie } from '../../utils/cookie';
import { actionRequestGetUser, actionRefreshAccessToken, actionRequestPatchUser } from '../../services/actions/actionsAuthorization';

export function ProtectedRoute ({ children, ...rest }) {

  const accessToken = getCookie('accessToken');
  const refreshToken = getCookie('refreshToken');

  console.log('КУКИ accessToken,', accessToken);
  console.log('КУКИ refreshToken,', refreshToken);

  const feedRequest = useSelector((state) => state.authorization.feedRequest);
  const isAuth = useSelector((state) => state.authorization.isAuth);

  const dispatch = useDispatch();


  // async function test () {
  //   return await setTimeout(() => {
  //     if(accessToken){
  //       console.log('Получение данных о пользователе');
  //       api.getUser(accessToken)
  //         .then(res => {
  //           if(res && (res.success === true)) {
  //             setFeedRequest(false);
  //             setToken(true);
  //             console.log('2.1 setFeedRequest ', feedRequest);
  //             console.log('2.1 token ', token);
  //           } else if (refreshToken && feedRequest) {
  //             console.log('2.2 setFeedRequest ', feedRequest);
  //               api.refreshToken(refreshToken)
  //                 .then(res => {
  //                   if (res && (res.success === true)) {
  //                     console.log('res = ', res);
  //                     let newAccessToken = res.accessToken.split('Bearer ')[1];
  //                     setCookie('accessToken', newAccessToken, { 'max-age': timeCookie });
  //                     setCookie('refreshToken', res.refreshToken);
  //                     console.log('2.2.1 setFeedRequest ', feedRequest);
  //                     api.getUser(newAccessToken)
  //                       .then(res => {
  //                         if (res && (res.success === true)) {
  //                           setFeedRequest(false);
  //                           setToken(true);
  //                           console.log('2.2.1.1 setFeedRequest ', feedRequest);
  //                         }
  //                       })
  //                   } else {
  //                     setFeedRequest(false);
  //                     setToken(false);
  //                     console.log('2.2.2 setFeedRequest ', feedRequest);
  //                   }
  //                 })
  //           } else {
  //             setFeedRequest(false);
  //             setToken(false);
  //             console.log('2.3 setFeedRequest ', feedRequest);
  //           }
  //         })
  //     } else if (refreshToken && feedRequest) {
  //       console.log('2.4 setFeedRequest ', feedRequest);
  //       api.refreshToken(refreshToken)
  //         .then(res => {
  //           if (res && (res.success === true)) {
  //             console.log('refreshToken 2 = ', res);
  //             let newAccessToken = res.accessToken.split('Bearer ')[1];
  //             setCookie('accessToken', newAccessToken, { 'max-age': timeCookie });
  //             setCookie('refreshToken', res.refreshToken);
  //             console.log('2.4.1 setFeedRequest ', feedRequest);
  //             api.getUser(newAccessToken)
  //               .then(res => {
  //                 if (res && (res.success === true)) {
  //                   setFeedRequest(false);
  //                   setToken(true);
  //                   console.log('2.4.1.1 setFeedRequest ', feedRequest);
  //                 }
  //               })
  //           } else {
  //             setFeedRequest(false);
  //             setToken(false);
  //             console.log('2.4.2 setFeedRequest ', feedRequest);
  //           }
  //         })
  //     } else {
  //       setFeedRequest(false);
  //       setToken(false);
  //       console.log('2.5 setFeedRequest ', feedRequest);
  //     }
  //   }, "1000")
  // }

  // test();

  // useEffect(() => {
  //   test();
  // }, [accessToken]
  // )

  useEffect(() => {
    dispatch(actionRequestGetUser(accessToken, refreshToken))
  }, [dispatch])
    // if(accessToken) {
    //   dispatch(actionRequestGetUser);
    // }
    // if (refreshToken) {
    //   api.refreshToken(refreshToken)
    //     .then(res => {
    //       if (res && (res.success === true)) {
    //         console.log('refreshToken = ', res);
    //         dispatch(actionRequestGetUser);
    //         // let newAccessToken = res.accessToken.split('Bearer ')[1];
    //         // setCookie('accessToken', newAccessToken, { 'max-age': timeCookie });
    //         // setCookie('refreshToken', res.refreshToken);
    //       }


  return (
    <>
      {/* {feedFailed && <h2 className={`text text_type_main-large`}>Произошла ошибка при получении данных</h2>} */}
      {feedRequest && <h2 className={`text text_type_main-large`}>Загрузка...</h2>}
      {
        !feedRequest &&
        <Route
          {...rest}
          render={({ location }) =>
            isAuth ? (
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
