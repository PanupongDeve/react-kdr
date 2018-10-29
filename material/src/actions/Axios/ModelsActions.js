
import modelDB from '../../class/ServicesAPI';
import { handleMessageError } from './Helper';

const ModelsOTS = modelDB.models.getOTS();
const ModelsTypes = ModelsOTS.getActionsTypes();

export const getModels = (errorAlertCallback, setMessageError, disableLoading=false) => async dispatch => {
    try {
        const models = await modelDB.models.get();
        ModelsOTS.sendPayloadToReducer(ModelsTypes.FETH_MODELS, models)(dispatch);
        if (disableLoading) disableLoading();
    } catch (error) {
        handleMessageError(error, errorAlertCallback, setMessageError);
        throw Promise.reject(error);
    }
}

export const getModel = (id, errorAlertCallback, setMessageError) => async dispatch => {
    try {
        const model = await modelDB.models.getById(id);
        ModelsOTS.sendPayloadToReducer(ModelsTypes.FETH_MODEL, model)(dispatch);
    } catch (error) {
        handleMessageError(error, errorAlertCallback, setMessageError);
        throw Promise.reject(error);
    }
}

export const createModels = (data, successAlertCallback, errorAlertCallback, getModels, setMessageError) => async dispatch => {
    try {

        await modelDB.models.create(data);
        setTimeout(() => {
            successAlertCallback();
            getModels(errorAlertCallback, setMessageError);  
        }, 500);
          
    } catch (error) {
        handleMessageError(error, errorAlertCallback, setMessageError);
        throw Promise.reject(error);
    }
}

export const updateModels = (id, data, successAlertCallback, errorAlertCallback, getModels, setMessageError) => async dispatch => {
    try {
        await modelDB.models.update(id, data);
        setTimeout(() => {
            successAlertCallback();
            getModels(errorAlertCallback, setMessageError);
        }, 500);
        
       
    } catch (error) {
        handleMessageError(error, errorAlertCallback, setMessageError);
        throw Promise.reject(error);
    }
}

export const deleteModel = (id, getModels, countItemDelete, ItemDeleteLength,errorAlertCallback, setMessageError) => async dispatch => {
    try {
        await modelDB.models.remove(id);
        if(isLastItemsforDelelte(countItemDelete, ItemDeleteLength)) {
            getModels(errorAlertCallback, setMessageError);
        }
    } catch (error) {
        if(isLastItemsforDelelte(countItemDelete, ItemDeleteLength)) {
            handleMessageError(error, errorAlertCallback, setMessageError);
        }
        throw Promise.reject(error);
    }
}

// export const restoreModel = (documentId) => async dispatch => {
//     try {
//         const result = await model.models.restoreByDocumentId(documentId);
//     } catch (error) {
//         throw Promise.reject(error);
//     }
// }

export const clearModel = () => async dispatch => {
    try {
        dispatch({
            type: ModelsTypes.CLEAR_MODEL
        });
    } catch (error) {
        throw Promise.reject(error); 
    }
}

const isLastItemsforDelelte = (countItemDelete, ItemDeleteLength) => {
    return countItemDelete === ItemDeleteLength ? true: false;
}
