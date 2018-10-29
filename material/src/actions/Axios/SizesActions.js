
import model from '../../class/ServicesAPI';
import ErrorHandleMessage from '../../class/ErrorHandleMessage';

const SizesOTS = model.sizes.getOTS();
const SizesTypes = SizesOTS.getActionsTypes();

export const getSizes = () => async dispatch => {
    try {

        const sizes = await model.sizes.get();
        SizesOTS.sendPayloadToReducer(SizesTypes.FETH_SIZES, sizes)(dispatch);
        
    } catch (error) {
        throw Promise.reject(error);
    }
}

export const getSize = (id) => async dispatch => {
    try {
        const size = await model.sizes.getById(id);
        SizesOTS.sendPayloadToReducer(SizesTypes.FETH_SIZE, size)(dispatch);
    } catch (error) {
        throw Promise.reject(error);
    }
}

export const createSizes = (data, successAlertCallback, errorAlertCallback, getSizes, setMessageError) => async dispatch => {
    try {

        await model.sizes.create(data);
        setTimeout(() => {
            successAlertCallback();
            getSizes();  
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

export const updateSizes = (id, data, successAlertCallback, errorAlertCallback, getSizes, setMessageError) => async dispatch => {
    try {
        await model.sizes.update(id, data);
        setTimeout(() => {
            successAlertCallback();
            getSizes();
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

export const deleteSize = (id, getSizes, countItemDelete, ItemDeleteLength,errorAlertCallback, setMessageError) => async dispatch => {
    try {
        await model.sizes.remove(id);
        if(isLastItemsforDelelte(countItemDelete, ItemDeleteLength)) {
            getSizes();
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

// export const restoreSize = (documentId) => async dispatch => {
//     try {
//         const result = await model.sizes.restoreByDocumentId(documentId);
//     } catch (error) {
//         throw Promise.reject(error);
//     }
// }

export const clearSize = () => async dispatch => {
    try {
        dispatch({
            type: SizesTypes.CLEAR_SIZE
        });
    } catch (error) {
        throw Promise.reject(error); 
    }
}

const isLastItemsforDelelte = (countItemDelete, ItemDeleteLength) => {
    return countItemDelete === ItemDeleteLength ? true: false;
}
