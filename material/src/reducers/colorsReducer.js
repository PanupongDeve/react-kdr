import model from "../class/FirebaseCloundFireStore";

const ColorsOTS = model.colors.getOTS();
const ColorsTypes = ColorsOTS.getActionsTypes();

export default (state = ColorsOTS.intialState(), action) => {
  let stateUpdate;
  
  switch (action.type) {
    case ColorsTypes.FETH_COLORS:
      stateUpdate = ColorsOTS.sendDataFormReducerToStore(
        action.payload,
        "colors"
      );
      state = Object.assign(state, stateUpdate);
      return {...state};
    case ColorsTypes.FETH_COLOR:
      stateUpdate = ColorsOTS.sendDataFormReducerToStore(
        action.payload,
        "color"
      );
      state = Object.assign(state, stateUpdate);
	  return {...state};
	case ColorsOTS.LOADING: 
		return ColorsOTS.intialState();
    default:
      return state;
  }
};
