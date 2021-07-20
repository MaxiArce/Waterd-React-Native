import { PLANTS } from "../../data/plants";
import { ADD_PLANT, SELECT_PLANT } from "../actions/plants.action";
import { DELETE_PLANT } from "../actions/plants.action";

const initialState = {
  list: PLANTS,
  selected: null,
};

const PlantsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_PLANT:
      return {
        ...state,
        selected: state.list.find((plants) => plants.id === action.plantID),
      };
    case ADD_PLANT:
      const newList = state.list.concat(action.item)
      return {
        ...state,
        list: newList
      };
    case DELETE_PLANT:
      return {
        ...state,
        list: state.list.filter((plants) => plants.id !== action.plantID),
      };
    default:
      return state;
  }

};

export default PlantsReducer;
