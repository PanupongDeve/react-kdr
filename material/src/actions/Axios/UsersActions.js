
import model from '../../class/ServicesAPI';
import role from '../../enums/role';
const UsersOTS = model.users.getOTS();
const UsersTypes = UsersOTS.getActionsTypes();

export const authentication = (data, redirectCallBack, errorAlertCallback, setMessageError) => async dispatch => {
    try {

        const response = await model.users.authentication(data);
        if(response.user.group !== role.ADMIN) {
            throw "You dont have permission"
        }
        model.storage.saveToken(response.token);
        model.storage.saveCurrentUser(response.user);
        redirectCallBack();
          
    } catch (error) {
        setMessageError(error === "You dont have permission" ? error : error.response.data.result);
        setTimeout(() => {
            errorAlertCallback();
        }, 500);
        throw Promise.reject(error);
    }
}

export const getUsers = () => async dispatch => {
    try {

        const users = await model.users.get();
        UsersOTS.sendPayloadToReducer(UsersTypes.FETH_USERS, users)(dispatch);
        
    } catch (error) {
        throw Promise.reject(error);
    }
}

export const getUser = (id) => async dispatch => {
    try {
        const user = await model.users.getById(id);
        UsersOTS.sendPayloadToReducer(UsersTypes.FETH_USER, user)(dispatch);
    } catch (error) {
        throw Promise.reject(error);
    }
}

export const createUsers = (data, successAlertCallback, errorAlertCallback, getUsers, setMessageError) => async dispatch => {
    try {

        await model.users.create(data);
        setTimeout(() => {
            successAlertCallback();
            getUsers();  
        }, 500);
          
    } catch (error) {
        setMessageError(error.response.data.result.errors[0].message);
        setTimeout(() => {
            errorAlertCallback();
        }, 500);
        throw Promise.reject(error);
    }
}

export const updateUsers = (id, data, successAlertCallback, errorAlertCallback, getUsers, setMessageError) => async dispatch => {
    try {
        await model.users.update(id, data);
        setTimeout(() => {
            successAlertCallback();
            getUsers();
        }, 500);
        
       
    } catch (error) {
        setMessageError(error.response.data.result.errors[0].message);
        setTimeout(() => {
            errorAlertCallback();
        }, 500);
        throw Promise.reject(error);
    }
}

export const deleteUser = (id, getUsers, countItemDelete, ItemDeleteLength,errorAlertCallback, setMessageError) => async dispatch => {
    try {
        await model.users.remove(id);
        if(isLastItemsforDelelte(countItemDelete, ItemDeleteLength)) {
            getUsers();
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

const isLastItemsforDelelte = (countItemDelete, ItemDeleteLength) => {
    return countItemDelete === ItemDeleteLength ? true: false;
}
