import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';

const root = ReactDOM.createRoot(document.getElementById('root'));

const teamsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_TEAMS':
      return action.payload;

    default:
      return state;
  }
}

const statsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_STATS':
      return action.payload;
    
      default:
        return state;
  }
}
const store = createStore(
  combineReducers({
    teamsReducer: teamsReducer,
    statsReducer: statsReducer
  }),
  applyMiddleware(logger)

);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
