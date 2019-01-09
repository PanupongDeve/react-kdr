import BaseOTS from './BaseOTS';

class UsersGroupsOTS extends BaseOTS {
    constructor() {
        super();
        this.actionsTypes = {
            FETCH_USER_GROUPS: "fetch_user_groups",
            FETCH_USER_GROUP: "fetch_user_group",
            CLEAR_USER_GROUP: "clear_user_group"
        }
    }

    intialData() {
        return {
            groups: [],
            group: ''
        }
    }

}

export default new UsersGroupsOTS();