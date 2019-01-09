import BaseOTS from './BaseOTS';

class UsersOTS extends BaseOTS {
    constructor() {
        super();
        this.actionsTypes = {
            FETCH_USERS: "fetch_users",
            FETCH_USER: "fetch_user",
            CLEAR_USER: "clear_user"
        }
    }

    intialData() {
        return {
            users: [],
            user: ''
        }
    }

}

export default new UsersOTS();