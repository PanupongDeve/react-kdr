import BaseService from './BaseService';
import UsersGroupsDTO from '../DataHelper/DTO/UsersGroupsDTO';
import UsersGroupsOTS from '../DataHelper/ObjectToStore/UsersGroupsOTS';
import UsersGroupsValidator from '../Validator/UsersGroupsValidator';

class GroupsService extends BaseService {
    constructor(domain) {
        super(domain)
        this.dto = UsersGroupsDTO;
        this.ots = UsersGroupsOTS;
    }
    
    getValidator() {
        return new UsersGroupsValidator();
    }

    getDTOClass() {

    }

    getOTSClass() {
        
    }
}

export default new GroupsService('api/groups/users');