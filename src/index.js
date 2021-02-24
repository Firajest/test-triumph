import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import mainReducer from './redux/reducers/mainReducer';
import { loadState, saveState } from './localstorage/localStorageMethods';

const persistedState = loadState();

const store = createStore(
  combineReducers({
    data: mainReducer,
  }),
  persistedState,
  composeWithDevTools(),
)
store.subscribe(() => {
  saveState({
    data: store.getState().data,
  });
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode >,
  document.getElementById('root')
);