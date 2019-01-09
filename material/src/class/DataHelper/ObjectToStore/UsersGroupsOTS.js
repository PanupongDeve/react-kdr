import BaseOTS from './BaseOTS';

class GroupsOTS extends BaseOTS {
    constructor() {
        super();
        this.actionsTypes = {
            FETH_USER_GROUPS: "fetch_user_groups",
            FETH_USER_GROUP: "fetch_user_group",
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

export default new GroupsOTS();