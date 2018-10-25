import BaseOTS from './BaseOTS';

class UsersOTS extends BaseOTS {
    constructor() {
        super();
        this.actionsTypes = {
            FETH_USERS: "fetch_users",
            FETH_USER: "fetch_user",
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