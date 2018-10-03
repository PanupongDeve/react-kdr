
import model from '../../class/ServicesAPI';

const ColorsOTS = model.colors.getOTS();
const ColorsTypes = ColorsOTS.getActionsTypes();

export const getColors = () => async dispatch => {
    try {

        const colors = await model.colors.get();
        ColorsOTS.sendPayloadToReducer(ColorsTypes.FETH_COLORS, colors)(dispatch);
        
    } catch (error) {
        throw Promise.reject(error);
    }
}

export const getColor = (id) => async dispatch => {
    try {
        const color = await model.colors.getById(id);
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
        }, 500);;
        throw Promise.reject(error);
    }
}

export const updateColors = (id, data, successAlertCallback, errorAlertCallback) => async dispatch => {
    try {
        await model.colors.update(id, data);
        successAlertCallback();
       
    } catch (error) {
        setTimeout(() => {
            errorAlertCallback();
        }, 500);;
        throw Promise.reject(error);
    }
}

export const deleteColor = (id) => async dispatch => {
    try {
        const result = await model.colors.remove(id);
    } catch (error) {
        throw Promise.reject(error);
    }
}

// export const restoreColor = (documentId) => async dispatch => {
//     try {
//         const result = await model.colors.restoreByDocumentId(documentId);
//     } catch (error) {
//         throw Promise.reject(error);
//     }
// }

export const clearColor = () => async dispatch => {
    try {
        dispatch({
            type: ColorsTypes.CLEAR_COLOR
        });
    } catch (error) {
        throw Promise.reject(error); 
    }
}
