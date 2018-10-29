
import model from '../../class/ServicesAPI';
import ErrorHandleMessage from '../../class/ErrorHandleMessage';

const OrdersOTS = model.orders.getOTS();
const OrdersTypes = OrdersOTS.getActionsTypes();

export const getOrders = () => async dispatch => {
    try {

        const orders = await model.orders.get();
        OrdersOTS.sendPayloadToReducer(OrdersTypes.FETH_ORDERS, orders)(dispatch);
        
    } catch (error) {
        throw Promise.reject(error);
    }
}

export const getOrder = (id) => async dispatch => {
    try {
        const order = await model.orders.getById(id);
        OrdersOTS.sendPayloadToReducer(OrdersTypes.FETH_ORDER, order)(dispatch);
    } catch (error) {
        throw Promise.reject(error);
    }
}

export const createOrders = (data, successAlertCallback, errorAlertCallback, getOrders, setMessageError) => async dispatch => {
    try {

        await model.orders.create(data);
        setTimeout(() => {
            successAlertCallback();
            getOrders();  
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

export const updateOrders = (id, data, successAlertCallback, errorAlertCallback, getOrders, setMessageError) => async dispatch => {
    try {
        await model.orders.update(id, data);
        setTimeout(() => {
            successAlertCallback();
            getOrders();
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

export const deleteOrder = (id, getOrders, countItemDelete, ItemDeleteLength,errorAlertCallback, setMessageError) => async dispatch => {
    try {
        await model.orders.remove(id);
        if(isLastItemsforDelelte(countItemDelete, ItemDeleteLength)) {
            getOrders();
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

// export const restoreOrder = (documentId) => async dispatch => {
//     try {
//         const result = await model.orders.restoreByDocumentId(documentId);
//     } catch (error) {
//         throw Promise.reject(error);
//     }
// }

export const clearOrder = () => async dispatch => {
    try {
        dispatch({
            type: OrdersTypes.CLEAR_ORDER
        });
    } catch (error) {
        throw Promise.reject(error); 
    }
}

const isLastItemsforDelelte = (countItemDelete, ItemDeleteLength) => {
    return countItemDelete === ItemDeleteLength ? true: false;
}
