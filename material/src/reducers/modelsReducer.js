import model from "../class/ServicesAPI";

const ModelsOTS = model.models.getOTS();
const ModelsTypes = ModelsOTS.getActionsTypes();

export default (state = ModelsOTS.intialState(), action) => {
  let stateUpdate;
  
  switch (action.type) {
    case ModelsTypes.FETH_MODELS:
      stateUpdate = ModelsOTS.sendDataFormReducerToStore(
        action.payload,
        "models"
      );
      state = Object.assign(state, stateUpdate);
      return {...state};
    case ModelsTypes.FETH_MODEL:
      stateUpdate = ModelsOTS.sendDataFormReducerToStore(
        action.payload,
        "model"
      );
      state = Object.assign(state, stateUpdate);
	  return {...state};
	case ModelsOTS.CLEAR_MODEL: 
		return ModelsOTS.intialState();
    default:
      return state;
  }
};
