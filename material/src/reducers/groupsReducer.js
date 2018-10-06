import model from "../class/ServicesAPI";

const GroupsOTS = model.groups.getOTS();
const GroupsTypes = GroupsOTS.getActionsTypes();

export default (state = GroupsOTS.intialState(), action) => {
  let stateUpdate;
  
  switch (action.type) {
    case GroupsTypes.FETH_GROUPS:
      stateUpdate = GroupsOTS.sendDataFormReducerToStore(
        action.payload,
        "groups"
      );
      state = Object.assign(state, stateUpdate);
      return {...state};
    case GroupsTypes.FETH_GROUP:
      stateUpdate = GroupsOTS.sendDataFormReducerToStore(
        action.payload,
        "group"
      );
      state = Object.assign(state, stateUpdate);
	  return {...state};
	case GroupsOTS.CLEAR_GROUP: 
		return GroupsOTS.intialState();
    default:
      return state;
  }
};
