
import model from '../class/FirebaseCloundFireStore';

const ColorsOTS = model.colors.getOTS();
const ColorsTypes = ColorsOTS.getActionsTypes();

export const getColors = () => async dispatch => {
    try {

        const functionReciveData = (data) => {
             ColorsOTS.sendPayloadToReducer(ColorsTypes.FETH_COLORS, data)(dispatch);
        }

        await model.colors.getAllWithRealtime(functionReciveData);
        
    } catch (error) {
        throw Promise.reject(error);
    }
}

export const getColor = (documentId) => async dispatch => {
    try {
        const color = await model.colors.getByDocumentId(documentId);
        ColorsOTS.sendPayloadToReducer(ColorsTypes.FETH_COLOR, color)(dispatch);
    } catch (error) {
        throw Promise.reject(error);
    }
}

export const createColors = (data, successAlertCallback, errorAlertCallback) => async dispatch => {
    try {
        await model.colors.create(data);
        successAlertCallback();
       
    } catch (error) {
        setTimeout(() => {
            errorAlertCallback();
        }, 500);
        throw Promise.reject(error);
    }
}

export const updateColors = (documentId, data) => async dispatch => {
    try {
        const result = await model.colors.updateByDocumentId(documentId, data);
       
    } catch (error) {
        throw Promise.reject(error);
    }
}

export const deleteColor = (documentId) => async dispatch => {
    try {
        const result = await model.colors.deleteByDocumentId(documentId);
    } catch (error) {
        throw Promise.reject(error);
    }
}

export const restoreColor = (documentId) => async dispatch => {
    try {
        const result = await model.colors.restoreByDocumentId(documentId);
    } catch (error) {
        throw Promise.reject(error);
    }
}

export const clearColor = () => async dispatch => {
    try {
        dispatch({
            type: ColorsTypes.CLEAR_COLOR
        });
    } catch (error) {
        throw Promise.reject(error); 
    }
}
