import model from "../class/ServicesAPI";

const SizesOTS = model.sizes.getOTS();
const SizesTypes = SizesOTS.getActionsTypes();

export default (state = SizesOTS.intialState(), action) => {
  let stateUpdate;
  
  switch (action.type) {
    case SizesTypes.FETH_SIZES:
      stateUpdate = SizesOTS.sendDataFormReducerToStore(
        action.payload,
        "sizes"
      );
      state = Object.assign(state, stateUpdate);
      return {...state};
    case SizesTypes.FETH_SIZE:
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
