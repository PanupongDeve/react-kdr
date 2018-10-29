
import model from '../../class/ServicesAPI';
import ErrorHandleMessage from '../../class/ErrorHandleMessage';
import { handleMessageError } from './Helper';

const GroupsOTS = model.groups.getOTS();
const GroupsTypes = GroupsOTS.getActionsTypes();

export const getGroups = (errorAlertCallback, setMessageError, disableLoading=false) => async dispatch => {
    try {

        const groups = await model.groups.get();
        GroupsOTS.sendPayloadToReducer(GroupsTypes.FETH_GROUPS, groups)(dispatch);
        if (disableLoading) disableLoading();

    } catch (error) {
        handleMessageError(error, errorAlertCallback, setMessageError);
        throw Promise.reject(error);
    }
}

export const getGroup = (id, errorAlertCallback, setMessageError) => async dispatch => {
    try {
        const group = await model.groups.getById(id);
        GroupsOTS.sendPayloadToReducer(GroupsTypes.FETH_GROUP, group)(dispatch);
    } catch (error) {
        handleMessageError(error, errorAlertCallback, setMessageError);
        throw Promise.reject(error);
    }
}

export const createGroups = (data, successAlertCallback, errorAlertCallback, getGroups, setMessageError) => async dispatch => {
    try {

        await model.groups.create(data);
        setTimeout(() => {
            successAlertCallback();
            getGroups(errorAlertCallback, setMessageError);  
        }, 500);
          
    } catch (error) {
        handleMessageError(error, errorAlertCallback, setMessageError);
        throw Promise.reject(error);
    }
}

export const updateGroups = (id, data, successAlertCallback, errorAlertCallback, getGroups, setMessageError) => async dispatch => {
    try {
        await model.groups.update(id, data);
        setTimeout(() => {
            successAlertCallback();
            getGroups(errorAlertCallback, setMessageError);
        }, 500);
        
       
    } catch (error) {
        handleMessageError(error, errorAlertCallback, setMessageError);
        throw Promise.reject(error);
    }
}

export const deleteGroup = (id, getGroups, countItemDelete, ItemDeleteLength,errorAlertCallback, setMessageError) => async dispatch => {
    try {
        await model.groups.remove(id);
        if(isLastItemsforDelelte(countItemDelete, ItemDeleteLength)) {
            getGroups(errorAlertCallback, setMessageError);
        }
    } catch (error) {
        if(isLastItemsforDelelte(countItemDelete, ItemDeleteLength)) {
            handleMessageError(error, errorAlertCallback, setMessageError);
        }
        throw Promise.reject(error);
    }
}

// export const restoreGroup = (documentId) => async dispatch => {
//     try {
//         const result = await model.groups.restoreByDocumentId(documentId);
//     } catch (error) {
//         throw Promise.reject(error);
//     }
// }

export const clearGroup = () => async dispatch => {
    try {
        dispatch({
            type: GroupsTypes.CLEAR_GROUP
        });
    } catch (error) {
        throw Promise.reject(error); 
    }
}

const isLastItemsforDelelte = (countItemDelete, ItemDeleteLength) => {
    return countItemDelete === ItemDeleteLength ? true: false;
}
