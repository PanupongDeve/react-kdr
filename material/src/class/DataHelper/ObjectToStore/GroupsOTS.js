import BaseOTS from './BaseOTS';

class GroupsOTS extends BaseOTS {
    constructor() {
        super();
        this.actionsTypes = {
            FETH_GROUPS: "fetch_groups",
            FETH_GROUP: "fetch_group",
            CLEAR_GROUP: "clear_group"
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