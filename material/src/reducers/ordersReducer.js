import model from "../class/ServicesAPI";

const OrdersOTS = model.orders.getOTS();
const OrdersTypes = OrdersOTS.getActionsTypes();

export default (state = OrdersOTS.intialState(), action) => {
  let stateUpdate;
  
  switch (action.type) {
    case OrdersTypes.FETCH_ORDERS:
      stateUpdate = OrdersOTS.sendDataFormReducerToStore(
        action.payload,
        "orders"
      );
      state = Object.assign(state, stateUpdate);
      return {...state};
    case OrdersTypes.FETCH_ORDER:
      stateUpdate = OrdersOTS.sendDataFormReducerToStore(
        action.payload,
        "order"
      );
      state = Object.assign(state, stateUpdate);
	  return {...state};
	case OrdersOTS.CLEAR_ORDER: 
		return OrdersOTS.intialState();
    default:
      return state;
  }
};
