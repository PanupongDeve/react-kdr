import model from "../class/ServicesAPI";

const UsersGroupsOTS = model.usersGroups.getOTS();
const UsersGroupsTypes = UsersGroupsOTS.getActionsTypes();

export default (state = UsersGroupsOTS.intialState(), action) => {
  let stateUpdate;
  
  switch (action.type) {
    case UsersGroupsTypes.FETCH_USER_GROUPS:
      stateUpdate = UsersGroupsOTS.sendDataFormReducerToStore(
        action.payload,
        "usersGroups"
      );
      state = Object.assign(state, stateUpdate);
      return {...state};
    case UsersGroupsTypes.FETCH_USER_GROUP:
      stateUpdate = UsersGroupsOTS.sendDataFormReducerToStore(
        action.payload,
        "usersGroup"
      );
      state = Object.assign(state, stateUpdate);
	  return {...state};
	case UsersGroupsOTS.CLEAR_COLOR: 
		return UsersGroupsOTS.intialState();
    default:
      return state;
  }
};
