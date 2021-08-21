import {
  ADD_PLANT,
  SELECT_PLANT,
  LOAD_PLANTS,
  DELETE_PLANT,
} from "../actions/plants.action";
import Plant from "../../models/Plant";

const initialState = {
  list: [],
  selected: null,
};

const PlantsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_PLANT:
      return {
        ...state,
        selected: state.list.find((plants) => plants.refId === action.plantID),
      };


    case LOAD_PLANTS:
      return {
        ...state,
        list : action.list.map(
          (item) =>
            new Plant(
              item.refId.toString(),
              item.name,
              item.iconId,
              item.isExteriorPlant,
              item.wateringDays,
              item.wateringTimeStamp
            )
        ),
      };

    case ADD_PLANT:
      const newPlant = new Plant(
        action.payload.refId.toString(),
        action.payload.name,
        action.payload.iconId,
        action.payload.isExteriorPlant,
        action.payload.wateringDays,
        action.payload.wateringTimeStamp
      );
      return {
        ...state,
        list: state.list.concat(newPlant),
      };
    case DELETE_PLANT:
      return {
        ...state,
        list: state.list.filter((plants) => plants.refId !== action.plantID),
      };
    default:
      return state;
  }
};

export default PlantsReducer;
