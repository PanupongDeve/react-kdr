import Colors from './ColorsService';
import Users from './๊UsersService';
import Storage from '../Storage'

class ServiceModel {
    constructor() {
        this.storage = new Storage();
        this.colors = Colors;
        this.users = Users;
    }

}

export default new ServiceModel();