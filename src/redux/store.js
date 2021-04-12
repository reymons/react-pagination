import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import appReducer from './reducers/appReducer';
import postReducer from './reducers/postReducer';

const reducers = combineReducers({
  posts: postReducer,
  app: appReducer
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;