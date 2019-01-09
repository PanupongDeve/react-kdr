import model from "../class/ServicesAPI";

const ColorsOTS = model.colors.getOTS();
const ColorsTypes = ColorsOTS.getActionsTypes();

export default (state = ColorsOTS.intialState(), action) => {
  let stateUpdate;
  
  switch (action.type) {
    case ColorsTypes.FETCH_COLORS:
      stateUpdate = ColorsOTS.sendDataFormReducerToStore(
        action.payload,
        "colors"
      );
      state = Object.assign(state, stateUpdate);
      return {...state};
    case ColorsTypes.FETCH_COLOR:
      stateUpdate = ColorsOTS.sendDataFormReducerToStore(
        action.payload,
        "color"
      );
      state = Object.assign(state, stateUpdate);
	  return {...state};
	case ColorsOTS.CLEAR_COLOR: 
		return ColorsOTS.intialState();
    default:
      return state;
  }
};
