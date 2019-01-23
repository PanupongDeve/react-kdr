
import model from '../../class/ServicesAPI';
import { handleMessageError } from './Helper';

const ProductsOTS = model.products.getOTS();
const ProductsTypes = ProductsOTS.getActionsTypes();

export const getProducts = (errorAlertCallback, setMessageError, disableLoading=false) => async dispatch => {
    try {

        const products = await model.products.get();
        ProductsOTS.sendPayloadToReducer(ProductsTypes.FETCH_PRODUCTS, products)(dispatch);
        if (disableLoading) disableLoading(); 
    } catch (error) {
        handleMessageError(error, errorAlertCallback, setMessageError);
        throw Promise.reject(error);
    }
}

export const getProduct = (id, errorAlertCallback, setMessageError) => async dispatch => {
    try {
        const product = await model.products.getById(id);
        ProductsOTS.sendPayloadToReducer(ProductsTypes.FETCH_PRODUCT, product)(dispatch);
    } catch (error) {
        handleMessageError(error, errorAlertCallback, setMessageError);
        throw Promise.reject(error);
    }
}

export const createProducts = (data, successAlertCallback, errorAlertCallback, getProducts, setMessageError) => async dispatch => {
    try {

        await model.products.create(data);
        setTimeout(() => {
            successAlertCallback();
            getProducts(errorAlertCallback, setMessageError);  
        }, 500);
          
    } catch (error) {
        handleMessageError(error, errorAlertCallback, setMessageError);
        throw Promise.reject(error);
    }
}

export const updateProducts = (id, data, successAlertCallback, errorAlertCallback, getProducts, setMessageError) => async dispatch => {
    try {
        await model.products.update(id, data);
        setTimeout(() => {
            successAlertCallback();
            getProducts(errorAlertCallback, setMessageError);
        }, 500);
        
       
    } catch (error) {
        handleMessageError(error, errorAlertCallback, setMessageError);
        throw Promise.reject(error);
    }
}

export const deleteProduct = (id, getProducts, countItemDelete, ItemDeleteLength,errorAlertCallback, setMessageError) => async dispatch => {
    try {
        await model.products.remove(id);
        if(isLastItemsforDelelte(countItemDelete, ItemDeleteLength)) {
            getProducts(errorAlertCallback, setMessageError);
        }
    } catch (error) {
        if(isLastItemsforDelelte(countItemDelete, ItemDeleteLength)) {
            handleMessageError(error, errorAlertCallback, setMessageError);
        }
        throw Promise.reject(error);
    }
}

// export const restoreProduct = (documentId) => async dispatch => {
//     try {
//         const result = await model.products.restoreByDocumentId(documentId);
//     } catch (error) {
//         throw Promise.reject(error);
//     }
// }

export const clearProduct = () => async dispatch => {
    try {
        dispatch({
            type: ProductsTypes.CLEAR_PRODUCT
        });
    } catch (error) {
        throw Promise.reject(error); 
    }
}

const isLastItemsforDelelte = (countItemDelete, ItemDeleteLength) => {
    return countItemDelete === ItemDeleteLength ? true: false;
}
