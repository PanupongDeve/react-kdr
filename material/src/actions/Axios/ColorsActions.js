
import model from '../../class/ServicesAPI';
import ErrorHandleMessage from '../../class/ErrorHandleMessage';

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

export const createColors = (data, successAlertCallback, errorAlertCallback, getColors, setMessageError) => async dispatch => {
    try {

        await model.colors.create(data);
        setTimeout(() => {
            successAlertCallback();
            getColors();  
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

export const updateColors = (id, data, successAlertCallback, errorAlertCallback, getColors, setMessageError) => async dispatch => {
    try {
        await model.colors.update(id, data);
        setTimeout(() => {
            successAlertCallback();
            getColors();
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

export const deleteColor = (id, getColors, countItemDelete, ItemDeleteLength,errorAlertCallback, setMessageError) => async dispatch => {
    try {
        await model.colors.remove(id);
        if(isLastItemsforDelelte(countItemDelete, ItemDeleteLength)) {
            getColors();
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

const isLastItemsforDelelte = (countItemDelete, ItemDeleteLength) => {
    return countItemDelete === ItemDeleteLength ? true: false;
}
