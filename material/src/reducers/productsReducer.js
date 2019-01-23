import model from "../class/ServicesAPI";

const ProductsOTS = model.products.getOTS();
const ProductsTypes = ProductsOTS.getActionsTypes();

export default (state = ProductsOTS.intialState(), action) => {
  let stateUpdate;
  
  switch (action.type) {
    case ProductsTypes.FETCH_PRODUCTS:
      stateUpdate = ProductsOTS.sendDataFormReducerToStore(
        action.payload,
        "products"
      );
      state = Object.assign(state, stateUpdate);
      return {...state};
    case ProductsTypes.FETCH_PRODUCT:
      stateUpdate = ProductsOTS.sendDataFormReducerToStore(
        action.payload,
        "product"
      );
      state = Object.assign(state, stateUpdate);
	  return {...state};
	case ProductsOTS.CLEAR_PRODUCT: 
		return ProductsOTS.intialState();
    default:
      return state;
  }
};
