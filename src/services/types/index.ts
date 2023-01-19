import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { store } from '../store';
import { TCountriesActions } from '../actions/countries';
import { TLaureatesActions } from '../actions/laureates';
import { TUserActions } from '../actions/user';

export type RootState = ReturnType<typeof store.getState>;

type TApplicationActions = TUserActions | TLaureatesActions | TCountriesActions;

export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;
