
import model from '../../class/ServicesAPI';
import role from '../../enums/role';
import { handleMessageError } from './Helper';

const UsersOTS = model.users.getOTS();
const UsersTypes = UsersOTS.getActionsTypes();


export const authentication = (data, redirectCallBack, errorAlertCallback, setMessageError, enableLoading, disableLoading) => async dispatch => {
    try {
        enableLoading();
        const response = await model.users.authentication(data);
        if(response.user.group !== role.ADMIN) {
            throw "You dont have permission";
        }
        disableLoading();
        model.storage.saveToken(response.token);
        model.storage.saveCurrentUser(response.user);
        redirectCallBack();
          
    } catch (error) {
        handleMessageError(error, errorAlertCallback, setMessageError);
        throw Promise.reject(error);
    }
}

export const getUsers = (errorAlertCallback, setMessageError, disableLoading=false) => async dispatch => {
    try {

        const users = await model.users.get();
        UsersOTS.sendPayloadToReducer(UsersTypes.FETCH_USERS, users)(dispatch);
        if (disableLoading) disableLoading();
    } catch (error) {
        handleMessageError(error, errorAlertCallback, setMessageError);
        throw Promise.reject(error);
    }
}

export const getUser = (id, errorAlertCallback, setMessageError) => async dispatch => {
    try {
        const user = await model.users.getById(id);
        UsersOTS.sendPayloadToReducer(UsersTypes.FETCH_USER, user)(dispatch);
    } catch (error) {
        handleMessageError(error, errorAlertCallback, setMessageError);
        throw Promise.reject(error);
    }
}

export const createUsers = (data, successAlertCallback, errorAlertCallback, getUsers, setMessageError) => async dispatch => {
    try {

        await model.users.create(data);
        setTimeout(() => {
            successAlertCallback();
            getUsers(errorAlertCallback, setMessageError);  
        }, 500);
          
    } catch (error) {
        handleMessageError(error, errorAlertCallback, setMessageError);
        throw Promise.reject(error);
    }
}

export const updateUsers = (id, data, successAlertCallback, errorAlertCallback, getUsers, setMessageError) => async dispatch => {
    try {
        await model.users.update(id, data);
        setTimeout(() => {
            successAlertCallback();
            getUsers(errorAlertCallback, setMessageError);
        }, 500);
        
       
    } catch (error) {
        handleMessageError(error, errorAlertCallback, setMessageError);
        throw Promise.reject(error);
    }
}

export const deleteUser = (id, getUsers, countItemDelete, ItemDeleteLength,errorAlertCallback, setMessageError) => async dispatch => {
    try {
        await model.users.remove(id);
        if(isLastItemsforDelelte(countItemDelete, ItemDeleteLength)) {
            getUsers(errorAlertCallback, setMessageError);
        }
    } catch (error) {
        if(isLastItemsforDelelte(countItemDelete, ItemDeleteLength)) {
            handleMessageError(error, errorAlertCallback, setMessageError);
        }
        throw Promise.reject(error);
    }
}

// export const restoreUser = (documentId) => async dispatch => {
//     try {
//         const result = await model.users.restoreByDocumentId(documentId);
//     } catch (error) {
//         throw Promise.reject(error);
//     }
// }

export const clearUser = () => async dispatch => {
    try {
        dispatch({
            type: UsersTypes.CLEAR_USER
        });
    } catch (error) {
        throw Promise.reject(error); 
    }
}

export const createUsersGroups = (data, successAlertCallback, errorAlertCallback, getUser, setMessageError) => async dispatch => {
    try {
        await model.usersGroups.create(data);
        setTimeout(() => {
            successAlertCallback();
            getUser();  
        }, 500);
          
    } catch (error) {
        handleMessageError(error, errorAlertCallback, setMessageError);
        throw Promise.reject(error);
    }
}

export const updateUsersGroup = (data, successAlertCallback, errorAlertCallback, getUser, setMessageError) => async dispatch => {
    try {
        await model.usersGroups.update(data);
        setTimeout(() => {
            successAlertCallback();
            getUser();  
        }, 500);
          
    } catch (error) {
        handleMessageError(error, errorAlertCallback, setMessageError);
        throw Promise.reject(error);
    }
}

export const deleteUsersGroup = (userId, groupId, getUser, errorAlertCallback, setMessageError) => async dispatch => {
    try {
        await model.usersGroups.remove(userId, groupId);
        getUser(errorAlertCallback, setMessageError);
    } catch (error) {
        handleMessageError(error, errorAlertCallback, setMessageError);
        throw Promise.reject(error);
    }
}

const isLastItemsforDelelte = (countItemDelete, ItemDeleteLength) => {
    return countItemDelete === ItemDeleteLength ? true: false;
}
