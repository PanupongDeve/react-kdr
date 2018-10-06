import BaseService from './BaseService';
import GroupsDTO from '../DataHelper/DTO/GroupsDTO';
import GroupsOTS from '../DataHelper/ObjectToStore/GroupsOTS';
import GroupsValidator from '../Validator/GroupsValidator';

class GroupsService extends BaseService {
    constructor(domain) {
        super(domain)
        this.dto = GroupsDTO;
        this.ots = GroupsOTS;
    }
    
    getGroupsValidator() {
        return new GroupsValidator();
    }
}

export default new GroupsService('api/groups');