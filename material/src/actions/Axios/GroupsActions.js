
import model from '../../class/ServicesAPI';

const GroupsOTS = model.groups.getOTS();
const GroupsTypes = GroupsOTS.getActionsTypes();

export const getGroups = () => async dispatch => {
    try {

        const groups = await model.groups.get();
        GroupsOTS.sendPayloadToReducer(GroupsTypes.FETH_GROUPS, groups)(dispatch);
        
    } catch (error) {
        throw Promise.reject(error);
    }
}

export const getGroup = (id) => async dispatch => {
    try {
        const group = await model.groups.getById(id);
        GroupsOTS.sendPayloadToReducer(GroupsTypes.FETH_GROUP, group)(dispatch);
    } catch (error) {
        throw Promise.reject(error);
    }
}

export const createGroups = (data, successAlertCallback, errorAlertCallback, getGroups, setMessageError) => async dispatch => {
    try {

        await model.groups.create(data);
        setTimeout(() => {
            successAlertCallback();
            getGroups();  
        }, 500);
          
    } catch (error) {
        setMessageError(error.response.data.result.errors[0].message);
        setTimeout(() => {
            errorAlertCallback();
        }, 500);
        throw Promise.reject(error);
    }
}

export const updateGroups = (id, data, successAlertCallback, errorAlertCallback, getGroups, setMessageError) => async dispatch => {
    try {
        await model.groups.update(id, data);
        setTimeout(() => {
            successAlertCallback();
            getGroups();
        }, 500);
        
       
    } catch (error) {
        setMessageError(error.response.data.result.errors[0].message);
        setTimeout(() => {
            errorAlertCallback();
        }, 500);
        throw Promise.reject(error);
    }
}

export const deleteGroup = (id, getGroups, countItemDelete, ItemDeleteLength,errorAlertCallback, setMessageError) => async dispatch => {
    try {
        await model.groups.remove(id);
        if(isLastItemsforDelelte(countItemDelete, ItemDeleteLength)) {
            getGroups();
        }
    } catch (error) {
        if(isLastItemsforDelelte(countItemDelete, ItemDeleteLength)) {
            setMessageError(error.response.data.result.errors[0].message);
            setTimeout(() => {
                errorAlertCallback();
            }, 500);
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
