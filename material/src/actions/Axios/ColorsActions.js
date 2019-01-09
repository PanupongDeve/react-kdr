
import model from '../../class/ServicesAPI';
import { handleMessageError } from './Helper';

const ColorsOTS = model.colors.getOTS();
const ColorsTypes = ColorsOTS.getActionsTypes();

export const getColors = (errorAlertCallback, setMessageError, disableLoading=false) => async dispatch => {
    try {

        const colors = await model.colors.get();
        ColorsOTS.sendPayloadToReducer(ColorsTypes.FETH_COLORS, colors)(dispatch);
        if (disableLoading) disableLoading();
    } catch (error) {
        handleMessageError(error, errorAlertCallback, setMessageError);
        throw Promise.reject(error);
    }
}

export const getColor = (id, errorAlertCallback, setMessageError) => async dispatch => {
    try {
        const color = await model.colors.getById(id);
        ColorsOTS.sendPayloadToReducer(ColorsTypes.FETH_COLOR, color)(dispatch);
    } catch (error) {
        handleMessageError(error, errorAlertCallback, setMessageError);
        throw Promise.reject(error);
    }
}

export const createColors = (data, successAlertCallback, errorAlertCallback, getColors, setMessageError) => async dispatch => {
    try {

        await model.colors.create(data);
        setTimeout(() => {
            successAlertCallback();
            getColors(errorAlertCallback, setMessageError);  
        }, 500);
          
    } catch (error) {
        handleMessageError(error, errorAlertCallback, setMessageError);
        throw Promise.reject(error);
    }
}

export const updateColors = (id, data, successAlertCallback, errorAlertCallback, getColors, setMessageError) => async dispatch => {
    try {
        await model.colors.update(id, data);
        setTimeout(() => {
            successAlertCallback();
            getColors(errorAlertCallback, setMessageError);
        }, 500);
        
       
    } catch (error) {
        handleMessageError(error, errorAlertCallback, setMessageError);
        throw Promise.reject(error);
    }
}

export const deleteColor = (id, getColors, countItemDelete, ItemDeleteLength,errorAlertCallback, setMessageError) => async dispatch => {
    try {
        await model.colors.remove(id);
        if(isLastItemsforDelelte(countItemDelete, ItemDeleteLength)) {
            getColors(errorAlertCallback, setMessageError);
        }
    } catch (error) {
        if(isLastItemsforDelelte(countItemDelete, ItemDeleteLength)) {
            handleMessageError(error, errorAlertCallback, setMessageError);;
        }
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

const isLastItemsforDelelte = (countItemDelete, ItemDeleteLength) => {
    return countItemDelete === ItemDeleteLength ? true: false;
}
