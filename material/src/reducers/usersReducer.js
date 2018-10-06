import model from "../class/ServicesAPI";

const UsersOTS = model.users.getOTS();
const UsersTypes = UsersOTS.getActionsTypes();

export default (state = UsersOTS.intialState(), action) => {
  let stateUpdate;
  
  switch (action.type) {
    case UsersTypes.FETH_USERS:
      stateUpdate = UsersOTS.sendDataFormReducerToStore(
        action.payload,
        "users"
      );
      state = Object.assign(state, stateUpdate);
      return {...state};
    case UsersTypes.FETH_USER:
      stateUpdate = UsersOTS.sendDataFormReducerToStore(
        action.payload,
        "user"
      );
      state = Object.assign(state, stateUpdate);
	  return {...state};
	case UsersOTS.CLEAR_USER: 
		return UsersOTS.intialState();
    default:
      return state;
  }
};
