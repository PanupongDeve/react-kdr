
import { OPEN_MODAL, CLEAR_DATA } from '../actions/EditModalModelActions';
let funcionOpenModal = [];
const initState = { getOpenModalFunctions: [] };
export default (state = initState, action) => {
  switch (action.type) {
    case OPEN_MODAL: 
      funcionOpenModal.push(action.payload);
      return {...state, getOpenModalFunctions: funcionOpenModal }
    case CLEAR_DATA:
      funcionOpenModal = []
      return initState;
    default:
      return state;
  }
};
