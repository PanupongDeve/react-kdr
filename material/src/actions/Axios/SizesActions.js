
import model from '../../class/ServicesAPI';
import { handleMessageError } from './Helper';

const SizesOTS = model.sizes.getOTS();
const SizesTypes = SizesOTS.getActionsTypes();

export const getSizes = (errorAlertCallback, setMessageError, disableLoading=false) => async dispatch => {
    try {

        const sizes = await model.sizes.get();
        SizesOTS.sendPayloadToReducer(SizesTypes.FETCH_SIZES, sizes)(dispatch);
        if (disableLoading) disableLoading();
    } catch (error) {
        handleMessageError(error, errorAlertCallback, setMessageError);
        throw Promise.reject(error);
    }
}

export const getSize = (id, errorAlertCallback, setMessageError) => async dispatch => {
    try {
        const size = await model.sizes.getById(id);
        SizesOTS.sendPayloadToReducer(SizesTypes.FETCH_SIZE, size)(dispatch);
    } catch (error) {
        handleMessageError(error, errorAlertCallback, setMessageError)
        throw Promise.reject(error);
    }
}

export const createSizes = (data, successAlertCallback, errorAlertCallback, getSizes, setMessageError) => async dispatch => {
    try {

        await model.sizes.create(data);
        setTimeout(() => {
            successAlertCallback();
            getSizes(errorAlertCallback, setMessageError);  
        }, 500);
          
    } catch (error) {
        handleMessageError(error, errorAlertCallback, setMessageError);
        throw Promise.reject(error);
    }
}

export const updateSizes = (id, data, successAlertCallback, errorAlertCallback, getSizes, setMessageError) => async dispatch => {
    try {
        await model.sizes.update(id, data);
        setTimeout(() => {
            successAlertCallback();
            getSizes(errorAlertCallback, setMessageError);
        }, 500);
        
       
    } catch (error) {
        handleMessageError(error, errorAlertCallback, setMessageError);
        throw Promise.reject(error);
    }
}

export const deleteSize = (id, getSizes, countItemDelete, ItemDeleteLength,errorAlertCallback, setMessageError) => async dispatch => {
    try {
        await model.sizes.remove(id);
        if(isLastItemsforDelelte(countItemDelete, ItemDeleteLength)) {
            getSizes(errorAlertCallback, setMessageError);
        }
    } catch (error) {
        if(isLastItemsforDelelte(countItemDelete, ItemDeleteLength)) {
            handleMessageError(error, errorAlertCallback, setMessageError);
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
