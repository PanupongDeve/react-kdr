
import model from '../../class/ServicesAPI';
import { handleMessageError } from './Helper';

const UsersGroupsOTS = model.usersGroups.getOTS();
const UsersGroupsTypes = UsersGroupsOTS.getActionsTypes();


export const getUsersGroups = (errorAlertCallback, setMessageError, disableLoading=false) => async dispatch => {
    try {

        const usersGroups = await model.usersGroups.get();
        UsersGroupsOTS.sendPayloadToReducer(UsersGroupsTypes.FETCH_USER_GROUPS, usersGroups)(dispatch);
        if (disableLoading) disableLoading();
    } catch (error) {
        handleMessageError(error, errorAlertCallback, setMessageError);
        throw Promise.reject(error);
    }
}

export const getUsersGroup = (id, errorAlertCallback, setMessageError) => async dispatch => {
    try {
        const usersGroup = await model.usersGroups.getById(id);
        UsersGroupsOTS.sendPayloadToReducer(UsersGroupsTypes.FETCH_USER_GROUP, usersGroup)(dispatch);
    } catch (error) {
        handleMessageError(error, errorAlertCallback, setMessageError);
        throw Promise.reject(error);
    }
}

export const createUsersGroups = (data, successAlertCallback, errorAlertCallback, getUsersGroups, setMessageError) => async dispatch => {
    try {

        await model.usersGroups.create(data);
        setTimeout(() => {
            successAlertCallback();
            getUsersGroups(errorAlertCallback, setMessageError);  
        }, 500);
          
    } catch (error) {
        handleMessageError(error, errorAlertCallback, setMessageError);
        throw Promise.reject(error);
    }
}

export const updateUsersGroups = (id, data, successAlertCallback, errorAlertCallback, getUsersGroups, setMessageError) => async dispatch => {
    try {
        await model.usersGroups.update(id, data);
        setTimeout(() => {
            successAlertCallback();
            getUsersGroups(errorAlertCallback, setMessageError);
        }, 500);
        
       
    } catch (error) {
        handleMessageError(error, errorAlertCallback, setMessageError);
        throw Promise.reject(error);
    }
}

export const deleteUsersGroup = (id, getUsersGroups, countItemDelete, ItemDeleteLength,errorAlertCallback, setMessageError) => async dispatch => {
    try {
        await model.usersGroups.remove(id);
        if(isLastItemsforDelelte(countItemDelete, ItemDeleteLength)) {
            getUsersGroups(errorAlertCallback, setMessageError);
        }
    } catch (error) {
        if(isLastItemsforDelelte(countItemDelete, ItemDeleteLength)) {
            handleMessageError(error, errorAlertCallback, setMessageError);;
        }
        throw Promise.reject(error);
    }
}

export const clearUsersGroup = () => async dispatch => {
    try {
        dispatch({
            type: UsersGroupsTypes.CLEAR_USER_GROUP
        });
    } catch (error) {
        throw Promise.reject(error); 
    }
}

const isLastItemsforDelelte = (countItemDelete, ItemDeleteLength) => {
    return countItemDelete === ItemDeleteLength ? true: false;
}
