import { createStore , combineReducers } from 'redux'

import PlantsReducer from './reducers/plants.reducer'

const RootReducer = combineReducers ({
    plants: PlantsReducer
})

export default createStore(RootReducer)