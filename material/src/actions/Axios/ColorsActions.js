
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

export const createColors = (data, closeAlertCallback) => async dispatch => {
    try {
        throw 'error';
        await model.colors.create(data);
        closeAlertCallback();
       
    } catch (error) {
        closeAlertCallback();
        throw Promise.reject(error);
    }
}

export const updateColors = (id, data) => async dispatch => {
    try {
        const result = await model.colors.update(id, data);
       
    } catch (error) {
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
