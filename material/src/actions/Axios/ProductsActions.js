
import model from '../../class/ServicesAPI';
import ErrorHandleMessage from '../../class/ErrorHandleMessage';

const ProductsOTS = model.products.getOTS();
const ProductsTypes = ProductsOTS.getActionsTypes();

export const getProducts = () => async dispatch => {
    try {

        const products = await model.products.get();
        ProductsOTS.sendPayloadToReducer(ProductsTypes.FETH_PRODUCTS, products)(dispatch);
        
    } catch (error) {
        throw Promise.reject(error);
    }
}

export const getProduct = (id) => async dispatch => {
    try {
        const product = await model.products.getById(id);
        ProductsOTS.sendPayloadToReducer(ProductsTypes.FETH_PRODUCT, product)(dispatch);
    } catch (error) {
        throw Promise.reject(error);
    }
}

export const createProducts = (data, successAlertCallback, errorAlertCallback, getProducts, setMessageError) => async dispatch => {
    try {

        await model.products.create(data);
        setTimeout(() => {
            successAlertCallback();
            getProducts();  
        }, 500);
          
    } catch (error) {
        const errorHandleMessage = new ErrorHandleMessage();
        errorHandleMessage.setErrorMessage(error);
        const errorMessage = errorHandleMessage.getErrorMessage();
        setMessageError(errorMessage);
        setTimeout(() => {
            errorAlertCallback();
        }, 500);
        throw Promise.reject(error);
    }
}

export const updateProducts = (id, data, successAlertCallback, errorAlertCallback, getProducts, setMessageError) => async dispatch => {
    try {
        await model.products.update(id, data);
        setTimeout(() => {
            successAlertCallback();
            getProducts();
        }, 500);
        
       
    } catch (error) {
        const errorHandleMessage = new ErrorHandleMessage();
        errorHandleMessage.setErrorMessage(error);
        const errorMessage = errorHandleMessage.getErrorMessage();
        setMessageError(errorMessage);
        setTimeout(() => {
            errorAlertCallback();
        }, 500);
        throw Promise.reject(error);
    }
}

export const deleteProduct = (id, getProducts, countItemDelete, ItemDeleteLength,errorAlertCallback, setMessageError) => async dispatch => {
    try {
        await model.products.remove(id);
        if(isLastItemsforDelelte(countItemDelete, ItemDeleteLength)) {
            getProducts();
        }
    } catch (error) {
        if(isLastItemsforDelelte(countItemDelete, ItemDeleteLength)) {
            const errorHandleMessage = new ErrorHandleMessage();
            errorHandleMessage.setErrorMessage(error);
            const errorMessage = errorHandleMessage.getErrorMessage();
            setMessageError(errorMessage);
            setTimeout(() => {
                errorAlertCallback();
            }, 500);
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
