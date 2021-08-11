import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';


import AuthReducer from './reducers/auth.reducer';
import PlantsReducer from './reducers/plants.reducer'
import WeatherReducer from './reducers/weather.reducer'

const RootReducer = combineReducers ({
    plants: PlantsReducer,
    auth: AuthReducer,
    weather: WeatherReducer
})

export default createStore(
    RootReducer,
    compose(
      applyMiddleware(thunk),
    )
  )