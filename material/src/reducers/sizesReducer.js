import model from "../class/ServicesAPI";

const SizesOTS = model.sizes.getOTS();
const SizesTypes = SizesOTS.getActionsTypes();

export default (state = SizesOTS.intialState(), action) => {
  let stateUpdate;
  
  switch (action.type) {
    case SizesTypes.FETCH_SIZES:
      stateUpdate = SizesOTS.sendDataFormReducerToStore(
        action.payload,
        "sizes"
      );
      state = Object.assign(state, stateUpdate);
      return {...state};
    case SizesTypes.FETCH_SIZE:
      stateUpdate = SizesOTS.sendDataFormReducerToStore(
        action.payload,
        "size"
      );
      state = Object.assign(state, stateUpdate);
	  return {...state};
	case SizesOTS.CLEAR_SIZE: 
		return SizesOTS.intialState();
    default:
      return state;
  }
};
